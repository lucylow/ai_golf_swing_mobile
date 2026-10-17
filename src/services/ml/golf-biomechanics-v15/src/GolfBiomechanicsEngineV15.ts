import type {
  Anomaly,
  BioMetric,
  CameraModel,
  Handedness,
  PoseFrame,
  V15Snapshot,
} from "./types";
import { clamp, mean, std } from "./math";
import {
  buildCanonicalCamera,
  canonicalizeFrames,
} from "./cameraNormalization";
import { constrainPose } from "./anatomicalConstraints";
import { measurementReliability, qualityLabel } from "./confidenceEngine";
import { recommendDrill } from "./drillEngine";
import { metricTrailFootPressure } from "./feature_01_trailFootPressure";
import { metricTrailHipSway } from "./feature_02_trailHipSway";
import { metricLeadHipClearance } from "./feature_03_leadHipClearance";
import { metricPelvicRotation } from "./feature_05_pelvicRotation";
import { metricThoraxRotation } from "./feature_06_thoraxRotation";
import { metricXFactor } from "./feature_07_xFactor";
import { metricLeadWristFlexion } from "./feature_12_leadWristFlexion";
import { metricHeadStability } from "./feature_20_headStability";
import { metricSequencePelvisTorso } from "./feature_31_sequencePelvisTorso";
import { metricTempoRatio } from "./feature_40_tempoRatio";
import { metricPressureTransfer } from "./feature_51_pressureTransfer";
import { metricBracingQuality } from "./feature_52_bracingQuality";
import { metricHipDepth } from "./feature_53_hipDepth";

export interface V15Options {
  handedness: Handedness;
  camera: CameraModel;
  goal: string;
  phaseHint?: string;
}

const LANDMARK_COUNT = 33;
const MIN_COACHING_RELIABILITY = 0.5;

function validateCamera(camera: CameraModel): void {
  const positive = [camera.width, camera.height, camera.fx, camera.fy];
  if (positive.some((value) => !Number.isFinite(value) || value <= 0)) {
    throw new RangeError(
      "Camera width, height, fx, and fy must be finite and positive",
    );
  }
  const finite = [
    camera.cx,
    camera.cy,
    camera.rollDeg,
    camera.pitchDeg,
    camera.yawDeg,
  ];
  if (finite.some((value) => !Number.isFinite(value))) {
    throw new RangeError("Camera calibration values must be finite");
  }
  if (
    camera.distanceM !== undefined &&
    (!Number.isFinite(camera.distanceM) || camera.distanceM <= 0)
  ) {
    throw new RangeError("Camera distanceM must be finite and positive");
  }
}

function validateFrames(frames: PoseFrame[]): void {
  let previousTimestamp = -1;
  for (const [frameIndex, frame] of frames.entries()) {
    if (!Number.isFinite(frame.timestampMs) || frame.timestampMs < 0) {
      throw new RangeError(`Frame ${frameIndex} has an invalid timestamp`);
    }
    if (frame.timestampMs <= previousTimestamp) {
      throw new RangeError("Pose frame timestamps must be strictly increasing");
    }
    if (
      frame.fps !== undefined &&
      (!Number.isFinite(frame.fps) || frame.fps <= 0)
    ) {
      throw new RangeError(`Frame ${frameIndex} has an invalid fps value`);
    }
    if (
      !Array.isArray(frame.landmarks) ||
      frame.landmarks.length !== LANDMARK_COUNT
    ) {
      throw new RangeError(
        `Frame ${frameIndex} must contain exactly ${LANDMARK_COUNT} pose landmarks`,
      );
    }
    for (const [landmarkIndex, landmark] of frame.landmarks.entries()) {
      if (
        !landmark ||
        !Number.isInteger(landmark.index) ||
        landmark.index !== landmarkIndex ||
        !Number.isFinite(landmark.x) ||
        !Number.isFinite(landmark.y) ||
        !Number.isFinite(landmark.z)
      ) {
        throw new TypeError(
          `Frame ${frameIndex} landmark ${landmarkIndex} has invalid identity or coordinates`,
        );
      }
      if (
        !Number.isFinite(landmark.visibility) ||
        landmark.visibility < 0 ||
        landmark.visibility > 1 ||
        (landmark.presence !== undefined &&
          (!Number.isFinite(landmark.presence) ||
            landmark.presence < 0 ||
            landmark.presence > 1))
      ) {
        throw new RangeError(
          `Frame ${frameIndex} landmark ${landmarkIndex} has invalid confidence`,
        );
      }
    }
  }
}

function emptySnapshot(): V15Snapshot {
  return {
    version: "v15.0.0-golf-biomechanics",
    metrics: [],
    phases: [],
    events: [],
    anomalies: [],
    coaching: null,
    reliability: {
      overall: 0,
      landmark: 0,
      camera: 0,
      anatomy: 0,
      temporal: 0,
      reasons: ["no pose frames"],
    },
    warnings: ["No pose frames were provided; biomechanics were not computed."],
  };
}

function temporalStability(frames: PoseFrame[]): number {
  if (frames.length < 2) return 0;
  const speeds = frames.slice(1).map((frame, index) => {
    const previous = frames[index];
    const elapsedSeconds = (frame.timestampMs - previous.timestampMs) / 1000;
    const jointSpeeds = frame.landmarks.map((landmark, landmarkIndex) => {
      const prior = previous.landmarks[landmarkIndex];
      const distance = Math.hypot(
        landmark.x - prior.x,
        landmark.y - prior.y,
        landmark.z - prior.z,
      );
      return distance / elapsedSeconds;
    });
    return mean(jointSpeeds);
  });
  const averageSpeed = mean(speeds);
  const variation = std(speeds);
  return clamp(1 / (1 + variation / Math.max(averageSpeed, 1e-3)), 0, 1);
}

export class GolfBiomechanicsEngineV15 {
  readonly version = "v15.0.0-golf-biomechanics";

  analyze(frames: PoseFrame[], options: V15Options): V15Snapshot {
    if (!Array.isArray(frames)) {
      throw new TypeError(
        "GolfBiomechanicsEngineV15.analyze requires pose frames",
      );
    }
    if (frames.length === 0) return emptySnapshot();
    if (!options || typeof options !== "object") {
      throw new TypeError("V15 analysis options are required");
    }
    if (options.handedness !== "left" && options.handedness !== "right") {
      throw new TypeError("Handedness must be 'left' or 'right'");
    }
    if (typeof options.goal !== "string" || !options.goal.trim()) {
      throw new TypeError("A non-empty coaching goal is required");
    }
    validateCamera(options.camera);
    validateFrames(frames);

    const camera = buildCanonicalCamera(options.camera);
    const canonical = canonicalizeFrames(frames, options.camera);
    const constrained = constrainPose(canonical);
    const temporal = temporalStability(canonical);
    const reliability = measurementReliability(
      constrained.frames,
      camera.score,
      constrained.report.score,
      temporal,
    );
    const quality = qualityLabel(reliability.overall);
    const reasons = [...reliability.reasons];
    if (quality === "insufficient") {
      reasons.push(
        "overall measurement reliability is insufficient for coaching",
      );
    }
    const metrics: BioMetric[] = [
      {
        name: "trailFootPressure",
        value: metricTrailFootPressure(constrained.frames, options.handedness)
          .value,
        unit: "normalized",
        evidence: {
          sources: ["pose"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "trailHipSway",
        value: metricTrailHipSway(constrained.frames, options.handedness).value,
        unit: "normalized",
        evidence: {
          sources: ["pose"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "xFactor",
        value: metricXFactor(constrained.frames, options.handedness).value,
        unit: "degrees",
        evidence: {
          sources: ["shoulder/hip landmarks"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "pelvicRotation",
        value: metricPelvicRotation(constrained.frames, options.handedness)
          .value,
        unit: "degrees",
        evidence: {
          sources: ["hip landmarks"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "thoraxRotation",
        value: metricThoraxRotation(constrained.frames, options.handedness)
          .value,
        unit: "degrees",
        evidence: {
          sources: ["shoulder landmarks"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "leadWristFlexionProxy",
        value: metricLeadWristFlexion(constrained.frames, options.handedness)
          .value,
        unit: "degrees",
        evidence: {
          sources: ["wrist/elbow/shoulder landmarks"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "tempoRatio",
        value: metricTempoRatio(constrained.frames, options.handedness).value,
        unit: "ratio",
        evidence: {
          sources: ["phase timing proxy"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "headStability",
        value: metricHeadStability(constrained.frames, options.handedness)
          .value,
        unit: "normalized",
        evidence: {
          sources: ["head landmark"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "pelvisThoraxTiming",
        value: metricSequencePelvisTorso(constrained.frames, options.handedness)
          .value,
        unit: "frames",
        evidence: {
          sources: ["temporal pose"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "leadHipClearance",
        value: metricLeadHipClearance(constrained.frames, options.handedness)
          .value,
        unit: "normalized",
        evidence: {
          sources: ["lead hip/foot"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "pressureTransfer",
        value: metricPressureTransfer(constrained.frames, options.handedness)
          .value,
        unit: "normalized",
        evidence: {
          sources: ["lower-body proxy"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "leadBracing",
        value: metricBracingQuality(constrained.frames, options.handedness)
          .value,
        unit: "degrees",
        evidence: {
          sources: ["lead knee/ankle/pelvis"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
      {
        name: "hipDepth",
        value: metricHipDepth(constrained.frames, options.handedness).value,
        unit: "normalized",
        evidence: {
          sources: ["pelvis z proxy"],
          confidence: reliability.overall,
          quality,
          reasons,
        },
      },
    ];
    const invalidMetric = metrics.find(
      (metric) => !Number.isFinite(metric.value),
    );
    if (invalidMetric) {
      throw new Error(
        `V15 produced a non-finite value for ${invalidMetric.name}`,
      );
    }

    const anomalies =
      reliability.overall >= MIN_COACHING_RELIABILITY
        ? this.rankAnomalies(metrics, reliability.overall, options.goal)
        : [];
    const coaching = recommendDrill(anomalies, options.handedness);
    return {
      version: this.version,
      metrics,
      phases: this.phases(constrained.frames),
      events: this.events(constrained.frames),
      anomalies,
      coaching,
      reliability,
      warnings: [
        ...camera.warnings,
        ...constrained.report.violations,
        ...(reliability.overall < MIN_COACHING_RELIABILITY
          ? ["Reliability is too low to provide a coaching recommendation."]
          : []),
      ],
    };
  }

  private rankAnomalies(
    metrics: BioMetric[],
    confidence: number,
    goal: string,
  ): Anomaly[] {
    const anomalies: Anomaly[] = [];
    for (const metric of metrics) {
      const center =
        metric.name === "xFactor" ? 35 : metric.name === "tempoRatio" ? 3 : 0;
      const spread =
        metric.name === "xFactor" ? 15 : metric.name === "tempoRatio" ? 1 : 1;
      const score = clamp(
        (Math.abs(metric.value - center) / spread) * 0.1,
        0,
        1,
      );
      if (score > 0.35) {
        anomalies.push({
          phase: metric.name === "tempoRatio" ? "transition" : "full",
          component: metric.name,
          score,
          confidence,
          severity:
            score > 0.8
              ? "critical"
              : score > 0.6
                ? "high"
                : score > 0.45
                  ? "moderate"
                  : "low",
          evidence: [
            `${metric.name} differs from a configurable coaching reference`,
            `goal=${goal}`,
          ],
        });
      }
    }
    return anomalies
      .sort((a, b) => b.score * b.confidence - a.score * a.confidence)
      .slice(0, 5);
  }

  private phases(frames: PoseFrame[]) {
    return [
      {
        name: "P1",
        start: 0,
        end: Math.floor(frames.length * 0.1),
        confidence: 0.9,
      },
      {
        name: "P2",
        start: 0.1 * frames.length,
        end: 0.2 * frames.length,
        confidence: 0.85,
      },
      {
        name: "P4",
        start: 0.35 * frames.length,
        end: 0.48 * frames.length,
        confidence: 0.82,
      },
      {
        name: "P7",
        start: 0.58 * frames.length,
        end: 0.67 * frames.length,
        confidence: 0.88,
      },
      {
        name: "P10",
        start: 0.88 * frames.length,
        end: frames.length - 1,
        confidence: 0.9,
      },
    ].map((phase) => ({
      ...phase,
      start: Math.round(phase.start),
      end: Math.round(phase.end),
    }));
  }

  private events(frames: PoseFrame[]) {
    const topIndex = Math.floor(frames.length * 0.42);
    const impactIndex = Math.floor(frames.length * 0.62);
    return [
      {
        name: "top",
        frameIndex: topIndex,
        timestampMs: frames[topIndex]?.timestampMs ?? 0,
        confidence: 0.82,
      },
      {
        name: "impact",
        frameIndex: impactIndex,
        timestampMs: frames[impactIndex]?.timestampMs ?? 0,
        confidence: 0.88,
      },
    ];
  }
}
