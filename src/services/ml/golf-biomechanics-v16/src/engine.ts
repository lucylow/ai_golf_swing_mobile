import { PoseFrame, CameraCalibration, Handedness, V16Snapshot } from "./types";
import { estimateCameraQuality, canonicalize } from "./camera";
import { constrainSequence } from "./constraints";
import { detectPhases } from "./phaseEngine";
import { reliabilityFor } from "./reliability";
import { buildMetrics } from "./metrics";
import { buildAnomalies } from "./anomaly";
import { recommend } from "./coach";
import { estimateEnergy } from "./energyProxy";
import { screenMobility } from "./mobilityScreen";
import { shoulderSymmetry, kneeSymmetry } from "./symmetry";
export class GolfBiomechanicsEngineV16 {
  readonly version = "v16.0.0-biomechanics";
  analyze(
    frames: PoseFrame[],
    camera: CameraCalibration,
    handedness: Handedness,
    goal = "consistency",
  ): V16Snapshot {
    if (!Array.isArray(frames))
      throw new TypeError("V16 analysis requires an array of pose frames");
    if (!frames.length)
      return {
        version: this.version,
        metrics: [],
        events: [],
        phases: [],
        anomalies: [],
        coaching: null,
        reliability: {
          overall: 0,
          landmark: 0,
          camera: 0,
          anatomy: 0,
          temporal: 0,
          phase: 0,
          reasons: ["no pose frames"],
        },
        warnings: [
          "No pose frames were provided; biomechanics were not computed.",
        ],
        diagnostics: { goal, frameCount: 0 },
      };
    if (handedness !== "left" && handedness !== "right")
      throw new TypeError("Handedness must be 'left' or 'right'");
    if (typeof goal !== "string" || !goal.trim())
      throw new TypeError("A non-empty coaching goal is required");
    if (
      !camera ||
      ![camera.width, camera.height, camera.fx, camera.fy].every(
        (v) => Number.isFinite(v) && v > 0,
      ) ||
      ![
        camera.cx,
        camera.cy,
        camera.rollDeg,
        camera.pitchDeg,
        camera.yawDeg,
      ].every(Number.isFinite) ||
      (camera.distanceM !== undefined &&
        (!Number.isFinite(camera.distanceM) || camera.distanceM <= 0))
    )
      throw new RangeError(
        "Camera calibration must contain finite angles and positive finite dimensions/intrinsics",
      );
    let previousTimestamp = -1;
    for (const [frameIndex, frame] of frames.entries()) {
      if (
        !Number.isFinite(frame.timestampMs) ||
        frame.timestampMs < 0 ||
        frame.timestampMs <= previousTimestamp
      )
        throw new RangeError(
          "Pose frame timestamps must be finite, non-negative, and strictly increasing",
        );
      if (!Array.isArray(frame.landmarks) || frame.landmarks.length !== 33)
        throw new RangeError(
          `Frame ${frameIndex} must contain exactly 33 landmarks`,
        );
      for (const [landmarkIndex, landmark] of frame.landmarks.entries()) {
        if (
          !landmark ||
          landmark.index !== landmarkIndex ||
          ![landmark.x, landmark.y, landmark.z].every(Number.isFinite)
        )
          throw new TypeError(
            `Frame ${frameIndex} landmark ${landmarkIndex} has invalid identity or coordinates`,
          );
        if (
          !Number.isFinite(landmark.visibility) ||
          landmark.visibility < 0 ||
          landmark.visibility > 1 ||
          (landmark.presence !== undefined &&
            (!Number.isFinite(landmark.presence) ||
              landmark.presence < 0 ||
              landmark.presence > 1))
        )
          throw new RangeError(
            `Frame ${frameIndex} landmark ${landmarkIndex} has invalid confidence`,
          );
      }
      previousTimestamp = frame.timestampMs;
    }
    const cameraScore = estimateCameraQuality(camera, frames);
    const canonical = canonicalize(frames, camera);
    const constrained = constrainSequence(canonical);
    const phase = detectPhases(constrained.frames);
    const rel = reliabilityFor(
      constrained.frames,
      cameraScore,
      phase.confidence,
    );
    const metrics = buildMetrics(constrained.frames, handedness, rel);
    const energy = estimateEnergy(constrained.frames, handedness);
    const mobility = screenMobility(
      constrained.frames[Math.floor(constrained.frames.length / 3)] ??
        constrained.frames[0],
    );
    metrics.push({
      name: "energyTransferProxy",
      value: energy.transfer,
      unit: "proxy",
      evidence: {
        confidence: rel.overall * energy.confidence,
        quality: rel.overall > 0.75 ? "good" : "degraded",
        sources: ["pose sequence"],
        reasons: ["kinematic proxy"],
      },
    });
    metrics.push({
      name: "shoulderSymmetry",
      value: shoulderSymmetry(constrained.frames),
      unit: "normalized",
      evidence: {
        confidence: rel.overall,
        quality: rel.overall > 0.75 ? "good" : "degraded",
        sources: ["bilateral pose"],
        reasons: [],
      },
    });
    metrics.push({
      name: "kneeSymmetry",
      value: kneeSymmetry(constrained.frames),
      unit: "normalized",
      evidence: {
        confidence: rel.overall,
        quality: rel.overall > 0.75 ? "good" : "degraded",
        sources: ["bilateral pose"],
        reasons: [],
      },
    });
    metrics.push({
      name: "mobilityScreen",
      value: mobility.overall,
      unit: "normalized",
      evidence: {
        confidence: rel.overall,
        quality: rel.overall > 0.75 ? "good" : "degraded",
        sources: ["pose"],
        reasons: mobility.flags,
      },
    });
    const anomalies = buildAnomalies(metrics)
      .sort((a, b) => b.score * b.confidence - a.score * a.confidence)
      .slice(0, 7);
    const coaching =
      rel.overall >= 0.5 ? recommend(anomalies, handedness) : null;
    const invalidMetric = metrics.find(
      (metric) => !Number.isFinite(metric.value),
    );
    if (invalidMetric)
      throw new Error(
        `V16 produced a non-finite value for ${invalidMetric.name}`,
      );
    return {
      version: this.version,
      metrics,
      events: phase.events,
      phases: phase.phases,
      anomalies,
      coaching,
      reliability: rel,
      warnings: constrained.violations,
      diagnostics: {
        goal,
        cameraScore,
        frameCount: frames.length,
        phaseConfidence: phase.confidence,
        anomalyCount: anomalies.length,
      },
    };
  }
}
