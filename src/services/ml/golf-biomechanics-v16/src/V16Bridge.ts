import { GolfBiomechanicsEngineV16 } from "./engine";
import type {
  CameraCalibration,
  Handedness,
  PoseFrame,
  V16Snapshot,
} from "./types";

export interface AppPoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
  presence?: number;
  confidence?: number;
}

export interface AppPoseFrame {
  timestampMs: number;
  landmarks: AppPoseLandmark[];
  worldLandmarks?: AppPoseLandmark[];
  fps?: number;
}

function confidence(
  value: number | undefined,
  fallback: number,
  name: string,
): number {
  const resolved = value ?? fallback;
  if (!Number.isFinite(resolved) || resolved < 0 || resolved > 1) {
    throw new RangeError(`${name} must be finite and between 0 and 1`);
  }
  return resolved;
}

function validateInputFrame(frame: AppPoseFrame, frameIndex: number): void {
  if (!frame || !Number.isFinite(frame.timestampMs) || frame.timestampMs < 0) {
    throw new RangeError(`Frame ${frameIndex} has an invalid timestamp`);
  }
  if (
    frame.fps !== undefined &&
    (!Number.isFinite(frame.fps) || frame.fps <= 0)
  ) {
    throw new RangeError(`Frame ${frameIndex} FPS must be finite and positive`);
  }

  const landmarks = frame.worldLandmarks ?? frame.landmarks;
  if (!Array.isArray(landmarks) || landmarks.length !== 33) {
    throw new RangeError(
      `Frame ${frameIndex} must contain exactly 33 pose landmarks`,
    );
  }
  landmarks.forEach((landmark, landmarkIndex) => {
    if (
      !landmark ||
      !Number.isFinite(landmark.x) ||
      !Number.isFinite(landmark.y) ||
      !Number.isFinite(landmark.z)
    ) {
      throw new TypeError(
        `Frame ${frameIndex} landmark ${landmarkIndex} has invalid coordinates`,
      );
    }
    confidence(
      landmark.confidence,
      landmark.visibility ?? 0,
      `Frame ${frameIndex} landmark ${landmarkIndex} confidence`,
    );
    confidence(
      landmark.visibility,
      landmark.confidence ?? 0,
      `Frame ${frameIndex} landmark ${landmarkIndex} visibility`,
    );
    confidence(
      landmark.presence,
      landmark.confidence ?? landmark.visibility ?? 0,
      `Frame ${frameIndex} landmark ${landmarkIndex} presence`,
    );
  });
}

export function mapAppPoseFrame(frame: AppPoseFrame): PoseFrame {
  validateInputFrame(frame, 0);
  const source = frame.worldLandmarks ?? frame.landmarks;
  return {
    timestampMs: frame.timestampMs,
    fps: frame.fps,
    landmarks: source.map((landmark, index) => {
      const visibility = confidence(
        landmark.visibility,
        landmark.confidence ?? 0,
        `Landmark ${index} visibility`,
      );
      const presence = confidence(
        landmark.presence,
        landmark.confidence ?? visibility,
        `Landmark ${index} presence`,
      );
      return {
        index,
        x: landmark.x,
        y: landmark.y,
        z: landmark.z,
        visibility: visibility * presence,
        presence,
      };
    }),
  };
}

export class V16Bridge {
  constructor(private readonly engine = new GolfBiomechanicsEngineV16()) {}

  analyzeAppFrames(
    frames: AppPoseFrame[],
    camera: CameraCalibration,
    handedness: Handedness,
    goal = "consistency",
  ): V16Snapshot {
    if (!Array.isArray(frames)) {
      throw new TypeError("V16Bridge requires an array of app pose frames");
    }
    let previousTimestamp = -1;
    frames.forEach((frame, frameIndex) => {
      validateInputFrame(frame, frameIndex);
      if (frame.timestampMs <= previousTimestamp) {
        throw new RangeError(
          "Pose frame timestamps must be strictly increasing",
        );
      }
      previousTimestamp = frame.timestampMs;
    });
    const mapped = frames.map(mapAppPoseFrame);
    return this.engine.analyze(mapped, camera, handedness, goal);
  }
}
