import { calibrateGolfCamera } from "../camera/calibration";
import type { CalibrationFrame } from "../camera/calibration";
import { clamp, mean } from "../math";
import { temporalSelfAttention } from "../model/temporalAttention";
import { BaselineStore } from "../personalization/baselineStore";
import { rankHierarchicalAnomalies } from "../personalization/hierarchicalAnomaly";
import type {
  BiomechMetric,
  CoachingAction,
  PoseFrame,
  QualityState,
  V14Snapshot,
} from "../types";

const MIN_BASELINE_CONFIDENCE = 0.75;

function validateFrames(frames: PoseFrame[]): void {
  let previousTimestamp = -1;
  for (const [frameIndex, frame] of frames.entries()) {
    if (!Number.isFinite(frame.timestampMs) || frame.timestampMs < 0) {
      throw new RangeError(`Frame ${frameIndex} has an invalid timestamp`);
    }
    if (frame.timestampMs <= previousTimestamp) {
      throw new RangeError("Pose frame timestamps must be strictly increasing");
    }
    if (!Number.isFinite(frame.fps) || frame.fps <= 0) {
      throw new RangeError(`Frame ${frameIndex} has an invalid fps value`);
    }
    if (!Array.isArray(frame.landmarks) || frame.landmarks.length === 0) {
      throw new RangeError(`Frame ${frameIndex} must contain pose landmarks`);
    }
    if (
      frame.cameraQuality !== undefined &&
      (!Number.isFinite(frame.cameraQuality) ||
        frame.cameraQuality < 0 ||
        frame.cameraQuality > 1)
    ) {
      throw new RangeError(
        `Frame ${frameIndex} has an invalid cameraQuality value`,
      );
    }
    for (const landmark of frame.landmarks) {
      if (
        !landmark.id ||
        !Number.isFinite(landmark.p.x) ||
        !Number.isFinite(landmark.p.y) ||
        !Number.isFinite(landmark.p.z)
      ) {
        throw new TypeError(
          `Frame ${frameIndex} contains a landmark with invalid coordinates`,
        );
      }
      if (
        !Number.isFinite(landmark.visibility) ||
        landmark.visibility < 0 ||
        landmark.visibility > 1 ||
        !Number.isFinite(landmark.presence) ||
        landmark.presence < 0 ||
        landmark.presence > 1
      ) {
        throw new RangeError(
          `Frame ${frameIndex} contains invalid landmark confidence`,
        );
      }
    }
    previousTimestamp = frame.timestampMs;
  }
}

function qualityFor(confidence: number): QualityState {
  if (confidence >= 0.9) return "excellent";
  if (confidence >= 0.75) return "good";
  if (confidence >= 0.45) return "degraded";
  return "insufficient";
}

export class GolfBiomechanicsEngineV14 {
  readonly version = "v14.0.0-mobile-biomechanics";
  readonly baselines = new BaselineStore();

  analyze(frames: PoseFrame[], camera?: CalibrationFrame): V14Snapshot {
    if (!Array.isArray(frames)) {
      throw new TypeError(
        "GolfBiomechanicsEngineV14.analyze requires an array of pose frames",
      );
    }
    if (frames.length === 0) {
      return {
        quality: "insufficient",
        metrics: [],
        phases: [],
        anomalies: [],
        baselines: this.baselines.all(),
        action: null,
        warnings: [
          "No pose frames were provided; biomechanics were not computed.",
        ],
      };
    }
    validateFrames(frames);
    if (
      camera &&
      (!Number.isFinite(camera.width) ||
        camera.width <= 0 ||
        !Number.isFinite(camera.height) ||
        camera.height <= 0 ||
        !Number.isFinite(camera.horizonY) ||
        camera.horizonY < 0 ||
        camera.horizonY > camera.height ||
        !Number.isFinite(camera.targetLineDeg) ||
        !Number.isFinite(camera.rollDeg) ||
        (camera.confidence !== undefined &&
          (!Number.isFinite(camera.confidence) ||
            camera.confidence < 0 ||
            camera.confidence > 1)))
    ) {
      throw new RangeError(
        "Camera calibration values must be finite and dimensions must be positive",
      );
    }

    const landmarkConfidence = frames.flatMap((frame) =>
      frame.landmarks.map(
        (landmark) =>
          landmark.visibility * landmark.presence * (landmark.tracked ? 1 : 0),
      ),
    );
    const visibilityValues = frames.flatMap((frame) =>
      frame.landmarks.map((landmark) => landmark.visibility),
    );
    const poseConfidence = mean(landmarkConfidence);
    const cameraQualityValues = frames
      .map((frame) => frame.cameraQuality)
      .filter((value): value is number => value !== undefined);
    const effectiveConfidence =
      cameraQualityValues.length > 0
        ? poseConfidence * mean(cameraQualityValues)
        : poseConfidence;
    const quality = qualityFor(effectiveConfidence);
    const calibration = camera ? calibrateGolfCamera(camera) : undefined;
    const signals = frames.map((frame) =>
      mean(frame.landmarks.map((landmark) => landmark.p.y)),
    );
    const attention = temporalSelfAttention(
      signals.map((value) => [value]),
      {
        heads: 2,
        temperature: 1,
      },
    );
    const normalizedEntropy =
      signals.length > 1
        ? clamp(
            attention.entropy / (signals.length * Math.log(signals.length)),
            0,
            1,
          )
        : 0;
    const temporalEvidenceConfidence =
      poseConfidence * clamp((frames.length - 1) / 10, 0, 1);
    const metrics: BiomechMetric[] = [
      this.metric(
        "poseVisibility",
        mean(visibilityValues),
        "score",
        ["MediaPipe/native landmark visibility"],
        poseConfidence,
        poseConfidence < 0.75
          ? ["Landmark visibility, presence, or tracking is low."]
          : [],
      ),
      this.metric(
        "temporalStability",
        clamp(1 / (1 + varianceOf(signals)), 0, 1),
        "score",
        ["frame-to-frame landmark position"],
        temporalEvidenceConfidence,
        frames.length < 11
          ? ["Short sequence limits temporal stability confidence."]
          : [],
      ),
      this.metric(
        "cameraAlignment",
        calibration?.score ?? 0,
        "score",
        ["explicit camera calibration"],
        calibration
          ? (camera?.confidence ??
              (cameraQualityValues.length ? mean(cameraQualityValues) : 0))
          : 0,
        calibration
          ? cameraQualityValues.length || camera?.confidence !== undefined
            ? calibration.warnings
            : [
                ...calibration.warnings,
                "Camera calibration confidence was not supplied.",
              ]
          : ["Camera calibration was not supplied."],
      ),
      this.metric(
        "attentionEntropy",
        normalizedEntropy,
        "normalized",
        ["temporal attention"],
        temporalEvidenceConfidence,
        [],
      ),
    ];

    for (const metric of metrics) {
      if (metric.evidence.confidence >= MIN_BASELINE_CONFIDENCE) {
        this.baselines.record(metric.name, metric.value);
      }
    }

    const temporalMetric = metrics[1];
    const anomalies = rankHierarchicalAnomalies([
      {
        phase: "transition",
        component: "temporal_stability",
        score: 1 - temporalMetric.value,
        confidence: temporalMetric.evidence.confidence,
        evidence: ["frame-to-frame motion variance"],
      },
      {
        phase: "setup",
        component: "camera_alignment",
        score: calibration ? 1 - calibration.score : 0,
        confidence: metrics[2].evidence.confidence,
        evidence: calibration?.warnings.length
          ? calibration.warnings
          : calibration
            ? ["camera axes aligned"]
            : ["camera calibration unavailable"],
      },
    ]).filter((anomaly) => anomaly.confidence > 0);

    const primaryAnomaly = anomalies[0];
    const action: CoachingAction | null =
      quality !== "insufficient" &&
      primaryAnomaly &&
      primaryAnomaly.score * primaryAnomaly.confidence > 0.45
        ? {
            focus: primaryAnomaly.component,
            why: primaryAnomaly.evidence.join("; "),
            drill:
              "Slow-motion rehearsal with a fixed camera and three recheck swings",
            reps: 8,
            recheckSwings: 3,
            confidence: primaryAnomaly.confidence,
          }
        : null;

    return {
      quality,
      metrics,
      phases: [],
      anomalies,
      baselines: this.baselines.all(),
      action,
      warnings: calibration
        ? calibration.warnings
        : [
            "Camera alignment is unverified; camera-dependent measurements are estimates.",
          ],
    };
  }

  private metric(
    name: string,
    value: number,
    unit: "score" | "degrees" | "ratio" | "ms" | "meters" | "normalized",
    sources: string[],
    confidence: number,
    reasons: string[],
  ): BiomechMetric {
    return {
      name,
      value: Number.isFinite(value) ? value : 0,
      unit,
      evidence: {
        sources,
        confidence: clamp(confidence, 0, 1),
        quality: qualityFor(clamp(confidence, 0, 1)),
        reasons,
      },
    };
  }
}

const varianceOf = (values: number[]): number => {
  if (values.length === 0) return 0;
  const average = mean(values);
  return mean(values.map((value) => (value - average) ** 2));
};
