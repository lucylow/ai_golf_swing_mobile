import type { CameraModel, Handedness, PoseFrame, V15Snapshot } from "./types";
import { GolfBiomechanicsEngineV15 } from "./GolfBiomechanicsEngineV15";

export interface ExistingAppPoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
  presence?: number;
  confidence?: number;
}

export interface ExistingAppHandLandmark extends ExistingAppPoseLandmark {
  handedness?: Handedness;
}

export interface ExistingAppPoseResult {
  timestampMs: number;
  landmarks: ExistingAppPoseLandmark[];
  worldLandmarks?: ExistingAppPoseLandmark[];
  hands?: ExistingAppHandLandmark[];
  fps?: number;
}

function confidenceValue(
  value: number | undefined,
  fallback: number,
  label: string,
): number {
  const resolved = value ?? fallback;
  if (!Number.isFinite(resolved) || resolved < 0 || resolved > 1) {
    throw new RangeError(`${label} must be a finite number between 0 and 1`);
  }
  return resolved;
}

function validatePoints(
  points: ExistingAppPoseLandmark[],
  label: string,
  expectedCount: number,
): void {
  if (!Array.isArray(points) || points.length !== expectedCount) {
    throw new RangeError(
      `${label} must contain exactly ${expectedCount} landmarks`,
    );
  }
  for (const [index, point] of points.entries()) {
    if (
      !point ||
      !Number.isFinite(point.x) ||
      !Number.isFinite(point.y) ||
      !Number.isFinite(point.z)
    ) {
      throw new TypeError(`${label} landmark ${index} has invalid coordinates`);
    }
    const confidence = confidenceValue(
      point.confidence,
      point.visibility ?? 0,
      `${label} landmark ${index} confidence`,
    );
    confidenceValue(
      point.visibility,
      confidence,
      `${label} landmark ${index} visibility`,
    );
    confidenceValue(
      point.presence,
      confidence,
      `${label} landmark ${index} presence`,
    );
  }
}

function validateCamera(camera: CameraModel): void {
  if (!camera || typeof camera !== "object") {
    throw new TypeError("A calibrated camera model is required");
  }
  const positiveValues = [camera.width, camera.height, camera.fx, camera.fy];
  if (positiveValues.some((value) => !Number.isFinite(value) || value <= 0)) {
    throw new RangeError(
      "Camera width, height, fx, and fy must be finite and positive",
    );
  }
  const finiteValues = [
    camera.cx,
    camera.cy,
    camera.rollDeg,
    camera.pitchDeg,
    camera.yawDeg,
  ];
  if (finiteValues.some((value) => !Number.isFinite(value))) {
    throw new RangeError("Camera calibration values must be finite");
  }
  if (
    camera.distanceM !== undefined &&
    (!Number.isFinite(camera.distanceM) || camera.distanceM <= 0)
  ) {
    throw new RangeError("Camera distanceM must be finite and positive");
  }
}

export function mapExistingPose(result: ExistingAppPoseResult): PoseFrame {
  if (
    !result ||
    !Number.isFinite(result.timestampMs) ||
    result.timestampMs < 0
  ) {
    throw new RangeError("Pose timestampMs must be finite and non-negative");
  }
  if (
    result.fps !== undefined &&
    (!Number.isFinite(result.fps) || result.fps <= 0)
  ) {
    throw new RangeError("Pose FPS must be finite and positive");
  }
  const poseLandmarks = result.worldLandmarks ?? result.landmarks;
  validatePoints(poseLandmarks, "Pose", 33);
  if (result.hands?.length) validatePoints(result.hands, "Hand", 21);

  return {
    timestampMs: result.timestampMs,
    fps: result.fps,
    landmarks: poseLandmarks.map((point, index) => {
      const visibility = confidenceValue(
        point.visibility,
        point.confidence ?? 0,
        `Pose landmark ${index} visibility`,
      );
      const presence = confidenceValue(
        point.presence,
        point.confidence ?? visibility,
        `Pose landmark ${index} presence`,
      );
      return {
        index,
        x: point.x,
        y: point.y,
        z: point.z,
        visibility: visibility * presence,
        presence,
      };
    }),
    hands: result.hands?.map((point, index) => {
      const visibility = confidenceValue(
        point.visibility,
        point.confidence ?? 0,
        `Hand landmark ${index} visibility`,
      );
      const presence = confidenceValue(
        point.presence,
        point.confidence ?? visibility,
        `Hand landmark ${index} presence`,
      );
      return {
        index,
        x: point.x,
        y: point.y,
        z: point.z,
        visibility: visibility * presence,
        presence,
        handedness: point.handedness ?? "right",
      };
    }),
  };
}

export class V15Bridge {
  constructor(private readonly engine = new GolfBiomechanicsEngineV15()) {}

  analyze(
    results: ExistingAppPoseResult[],
    camera: CameraModel,
    handedness: Handedness,
    goal = "consistency",
  ): V15Snapshot {
    if (!Array.isArray(results)) {
      throw new TypeError("V15Bridge.analyze requires an array of pose frames");
    }
    validateCamera(camera);
    if (handedness !== "left" && handedness !== "right") {
      throw new TypeError("Handedness must be 'left' or 'right'");
    }
    if (typeof goal !== "string" || !goal.trim()) {
      throw new TypeError("A non-empty coaching goal is required");
    }

    const frames = results.map(mapExistingPose);
    for (let index = 1; index < frames.length; index += 1) {
      if (frames[index].timestampMs <= frames[index - 1].timestampMs) {
        throw new RangeError(
          "Pose frame timestamps must be strictly increasing",
        );
      }
    }
    return this.engine.analyze(frames, {
      camera,
      handedness,
      goal: goal.trim(),
    });
  }
}
