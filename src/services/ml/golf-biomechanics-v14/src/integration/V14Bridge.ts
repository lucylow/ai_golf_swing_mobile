import type { CalibrationFrame } from "../camera/calibration";
import { GolfBiomechanicsEngineV14 } from "../engine/GolfBiomechanicsEngineV14";
import type { PoseFrame as V14PoseFrame, V14Snapshot } from "../types";

export interface AppPoseLandmark {
  id: string | number;
  x: number;
  y: number;
  z: number;
  visibility?: number;
  presence?: number;
  confidence?: number;
  tracked?: boolean;
}

export interface ExistingAppPoseResult {
  timestampMs: number;
  landmarks: AppPoseLandmark[];
  fps?: number;
  width?: number;
  height?: number;
  cameraQuality?: number;
  cameraCalibration?: CalibrationFrame;
}

export interface AppPoseFrame extends ExistingAppPoseResult {
  frameIndex: number;
  width: number;
  height: number;
  landmarks: (AppPoseLandmark & { id: number })[];
  worldLandmarks?: (AppPoseLandmark & { id: number })[];
  detectionConfidence?: number;
  trackingConfidence?: number;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function probability(value: number | undefined, fallback: number): number {
  const next = value ?? fallback;
  if (!isFiniteNumber(next) || next < 0 || next > 1) {
    throw new RangeError(
      "Landmark confidence values must be finite numbers between 0 and 1",
    );
  }
  return next;
}

function validateFrame(frame: ExistingAppPoseResult): void {
  if (!isFiniteNumber(frame.timestampMs) || frame.timestampMs < 0) {
    throw new RangeError(
      "Pose frame timestampMs must be a finite, non-negative number",
    );
  }
  if (!Array.isArray(frame.landmarks) || frame.landmarks.length !== 33) {
    throw new RangeError(
      "V14Bridge requires exactly 33 pose landmarks per frame",
    );
  }
  if (
    frame.fps !== undefined &&
    (!isFiniteNumber(frame.fps) || frame.fps <= 0)
  ) {
    throw new RangeError("Pose frame fps must be a finite positive number");
  }
  const landmarkIds = new Set<string>();
  for (const [index, landmark] of frame.landmarks.entries()) {
    if (
      (typeof landmark.id !== "string" && typeof landmark.id !== "number") ||
      (typeof landmark.id === "string" && landmark.id.length === 0) ||
      (typeof landmark.id === "number" && !Number.isFinite(landmark.id)) ||
      !isFiniteNumber(landmark.x) ||
      !isFiniteNumber(landmark.y) ||
      !isFiniteNumber(landmark.z) ||
      (landmark.tracked !== undefined && typeof landmark.tracked !== "boolean")
    ) {
      throw new TypeError(
        `Pose landmark ${index} has an invalid id or non-finite coordinate`,
      );
    }
    const id = String(landmark.id);
    if (landmarkIds.has(id)) {
      throw new TypeError(`Pose frame contains duplicate landmark id: ${id}`);
    }
    landmarkIds.add(id);
    probability(landmark.visibility, landmark.confidence ?? 0);
    probability(
      landmark.presence,
      landmark.confidence ?? landmark.visibility ?? 0,
    );
  }
  if (
    frame.width !== undefined &&
    (!isFiniteNumber(frame.width) || frame.width <= 0)
  ) {
    throw new RangeError("Pose frame width must be a finite positive number");
  }
  if (
    frame.height !== undefined &&
    (!isFiniteNumber(frame.height) || frame.height <= 0)
  ) {
    throw new RangeError("Pose frame height must be a finite positive number");
  }
  if (
    frame.cameraQuality !== undefined &&
    (!isFiniteNumber(frame.cameraQuality) ||
      frame.cameraQuality < 0 ||
      frame.cameraQuality > 1)
  ) {
    throw new RangeError(
      "cameraQuality must be a finite number between 0 and 1",
    );
  }
}

function estimateFps(frames: ExistingAppPoseResult[]): number {
  const intervals = frames
    .slice(1)
    .map((frame, index) => frame.timestampMs - frames[index].timestampMs)
    .filter((interval) => Number.isFinite(interval) && interval > 0)
    .sort((a, b) => a - b);
  if (!intervals.length) return frames[0]?.fps ?? 30;
  const middle = Math.floor(intervals.length / 2);
  const medianInterval =
    intervals.length % 2 === 0
      ? (intervals[middle - 1] + intervals[middle]) / 2
      : intervals[middle];
  return 1000 / medianInterval;
}

export class V14Bridge {
  constructor(private readonly engine = new GolfBiomechanicsEngineV14()) {}

  mapNative(frame: ExistingAppPoseResult, fps = frame.fps ?? 30): V14PoseFrame {
    validateFrame(frame);
    if (!isFiniteNumber(fps) || fps <= 0) {
      throw new RangeError("fps must be a finite positive number");
    }

    return {
      timestampMs: frame.timestampMs,
      fps,
      cameraQuality: frame.cameraQuality,
      landmarks: frame.landmarks.map((landmark) => {
        const visibility = probability(
          landmark.visibility,
          landmark.confidence ?? 0,
        );
        const presence = probability(
          landmark.presence,
          landmark.confidence ?? visibility,
        );
        return {
          id: String(landmark.id),
          p: { x: landmark.x, y: landmark.y, z: landmark.z },
          visibility,
          presence,
          tracked: landmark.tracked ?? (visibility > 0 && presence > 0),
        };
      }),
    };
  }

  mapAppFrame(frame: AppPoseFrame): V14PoseFrame {
    if (!Number.isInteger(frame.frameIndex) || frame.frameIndex < 0) {
      throw new RangeError(
        "App pose frame frameIndex must be a non-negative integer",
      );
    }
    const sourceLandmarks = frame.worldLandmarks ?? frame.landmarks;
    return this.mapNative(
      {
        timestampMs: frame.timestampMs,
        fps: frame.fps,
        width: frame.width,
        height: frame.height,
        cameraQuality: frame.cameraQuality,
        landmarks: sourceLandmarks.map((landmark) => ({
          ...landmark,
          visibility: landmark.visibility,
          presence: landmark.presence,
        })),
      },
      frame.fps ?? 30,
    );
  }

  analyze(
    nativeFrames: ExistingAppPoseResult[],
    camera?: CalibrationFrame,
  ): V14Snapshot {
    if (!Array.isArray(nativeFrames)) {
      throw new TypeError("V14Bridge.analyze requires an array of pose frames");
    }
    if (nativeFrames.length === 0) {
      return this.engine.analyze([]);
    }
    nativeFrames.forEach(validateFrame);
    const fps = estimateFps(nativeFrames);
    const frames = nativeFrames.map((frame) =>
      this.mapNative(frame, frame.fps ?? fps),
    );
    const cameraFrame = camera ?? nativeFrames[0].cameraCalibration;
    return this.engine.analyze(frames, cameraFrame);
  }

  analyzeAppFrames(
    frames: AppPoseFrame[],
    camera?: CalibrationFrame,
  ): V14Snapshot {
    if (!Array.isArray(frames)) {
      throw new TypeError(
        "V14Bridge.analyzeAppFrames requires an array of pose frames",
      );
    }
    if (frames.length === 0) {
      return this.engine.analyze([]);
    }
    frames.forEach(validateFrame);
    const fps = estimateFps(frames);
    const mapped = frames.map((frame) =>
      this.mapAppFrame({ ...frame, fps: frame.fps ?? fps }),
    );
    const cameraFrame = camera ?? frames[0].cameraCalibration;
    return this.engine.analyze(mapped, cameraFrame);
  }
}
