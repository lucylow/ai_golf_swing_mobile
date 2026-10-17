import type {
  BioMetric,
  CameraCalibration,
  Handedness,
  PoseFrame,
  V16Snapshot,
} from "./types";
import { GolfBiomechanicsEngineV16 } from "../../golf-biomechanics-v16";
import { assessReadiness } from "./v17/quality/readiness";
import { buildMultiResolution } from "./v17/temporal/multiResolution";
import { impactEvent } from "./v17/events/impactWindow";
import { personalizedAnomaly } from "./v17/personalization/manifold";
import { simulateLeadWristAdjustment } from "./v17/counterfactual/swingAdjustment";
import {
  assessTrailFootStability,
  type DrillAssessment as TrailFootAssessment,
} from "./v17/drills/trailFootStability";
import { assessClubfaceControl } from "./v17/drills/clubfaceControl";
import { runRegisteredFeatures } from "./v17/feature_sets/registry";

export interface V17Options {
  goal?: string;
  history?: BioMetric[];
  enableCounterfactual?: boolean;
}

export interface V17Snapshot {
  version: string;
  base: V16Snapshot;
  readiness: ReturnType<typeof assessReadiness>;
  temporal: ReturnType<typeof buildMultiResolution>;
  impact: ReturnType<typeof impactEvent> | null;
  personalized: ReturnType<typeof personalizedAnomaly>[];
  counterfactual: ReturnType<typeof simulateLeadWristAdjustment> | null;
  drillSignals: Array<
    TrailFootAssessment | ReturnType<typeof assessClubfaceControl>
  >;
  registeredFeatures: ReturnType<typeof runRegisteredFeatures>;
}

function validateCamera(camera: CameraCalibration): void {
  if (
    !camera ||
    ![camera.width, camera.height, camera.fx, camera.fy].every(
      (value) => Number.isFinite(value) && value > 0,
    ) ||
    ![
      camera.cx,
      camera.cy,
      camera.rollDeg,
      camera.pitchDeg,
      camera.yawDeg,
    ].every(Number.isFinite) ||
    (camera.distanceM !== undefined &&
      (!Number.isFinite(camera.distanceM) || camera.distanceM <= 0)) ||
    (camera.targetLineDeg !== undefined &&
      !Number.isFinite(camera.targetLineDeg))
  ) {
    throw new RangeError("V17 requires valid finite camera calibration");
  }
}

function validateOptions(options: V17Options): void {
  if (!options || typeof options !== "object") {
    throw new TypeError("V17 options must be an object");
  }
  if (
    options.goal !== undefined &&
    (typeof options.goal !== "string" || !options.goal.trim())
  ) {
    throw new TypeError("V17 goal must be a non-empty string");
  }
  if (
    options.enableCounterfactual !== undefined &&
    typeof options.enableCounterfactual !== "boolean"
  ) {
    throw new TypeError("enableCounterfactual must be a boolean");
  }
  if (options.history !== undefined && !Array.isArray(options.history)) {
    throw new TypeError("V17 history must be an array of biomechanics metrics");
  }
  for (const [index, metric] of (options.history ?? []).entries()) {
    if (
      !metric ||
      typeof metric.name !== "string" ||
      !metric.name.trim() ||
      !Number.isFinite(metric.value) ||
      !metric.evidence ||
      !Number.isFinite(metric.evidence.confidence) ||
      metric.evidence.confidence < 0 ||
      metric.evidence.confidence > 1
    ) {
      throw new TypeError(`V17 history metric ${index} is invalid`);
    }
  }
}

function scaleDrillConfidence(
  assessment: TrailFootAssessment | ReturnType<typeof assessClubfaceControl>,
  reliability: number,
): TrailFootAssessment | ReturnType<typeof assessClubfaceControl> {
  return {
    ...assessment,
    confidence: assessment.confidence * reliability,
    signals: assessment.signals.map((signal) => ({
      ...signal,
      confidence: signal.confidence * reliability,
    })),
  };
}

export class GolfBiomechanicsEngineV17 {
  private readonly base = new GolfBiomechanicsEngineV16();

  analyze(
    frames: PoseFrame[],
    camera: CameraCalibration,
    handedness: Handedness,
    options: V17Options = {},
  ): V17Snapshot {
    if (!Array.isArray(frames)) {
      throw new TypeError("V17 analysis requires an array of pose frames");
    }
    if (handedness !== "left" && handedness !== "right") {
      throw new TypeError("Handedness must be 'left' or 'right'");
    }
    validateCamera(camera);
    validateOptions(options);

    const base = this.base.analyze(
      frames,
      camera,
      handedness,
      options.goal ?? "consistency",
    );
    if (frames.length === 0) {
      return {
        version: "v17.0.0-biomechanics",
        base,
        readiness: { score: 0, ready: false, reasons: ["no frames"] },
        temporal: { fast: [], medium: [], long: [] },
        impact: null,
        personalized: [],
        counterfactual: null,
        drillSignals: [],
        registeredFeatures: [],
      };
    }

    const readiness = assessReadiness(frames);
    const temporal = buildMultiResolution(frames);
    const impact = impactEvent(frames);
    const history = options.history ?? [];
    const personalized = base.metrics.map((metric) =>
      personalizedAnomaly(metric, history),
    );
    const counterfactual = options.enableCounterfactual
      ? simulateLeadWristAdjustment(frames, handedness, 8)
      : null;
    if (counterfactual) {
      counterfactual.confidence *= base.reliability.overall;
    }
    const drillSignals = [
      scaleDrillConfidence(
        assessClubfaceControl(frames, handedness),
        base.reliability.overall,
      ),
      scaleDrillConfidence(
        assessTrailFootStability(frames, handedness),
        base.reliability.overall,
      ),
    ];
    const registeredFeatures = runRegisteredFeatures(frames, handedness);

    return {
      version: "v17.0.0-biomechanics",
      base,
      readiness,
      temporal,
      impact,
      personalized,
      counterfactual,
      drillSignals,
      registeredFeatures,
    };
  }
}
