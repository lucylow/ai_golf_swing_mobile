import { PoseInferenceAdapter } from "../types/adapter";
import { PosePipelineConfig, defaultPosePipelineConfig } from "../types/config";
import { PoseFrame } from "../types/landmarks";
import { PoseSwingAnalyzer } from "../pipeline/analyzer";
import {
  V14Bridge,
  type CalibrationFrame,
  type V14Snapshot,
} from "../../golf-biomechanics-v14";
import {
  V15Bridge,
  type CameraModel as V15CameraModel,
  type Handedness as V15Handedness,
  type V15Snapshot,
} from "../../golf-biomechanics-v15";
import {
  V16Bridge,
  type CameraCalibration as V16CameraCalibration,
  type Handedness as V16Handedness,
  type V16Snapshot,
} from "../../golf-biomechanics-v16";
import {
  V17Bridge,
  type CameraCalibration as V17CameraCalibration,
  type Handedness as V17Handedness,
  type V17Options,
  type V17Snapshot,
} from "../../golf-biomechanics-v17";

export type PoseControllerState =
  | "idle"
  | "initializing"
  | "tracking"
  | "paused"
  | "error"
  | "disposed";
const DEFAULT_MAX_FRAMES = 180;

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return typeof error === "string" && error.length
    ? error
    : "Unknown pose pipeline error";
}

function isValidPoseFrame(frame: PoseFrame | null): frame is PoseFrame {
  const validLandmarks = (landmarks: PoseFrame["landmarks"]) =>
    Array.isArray(landmarks) &&
    landmarks.length === 33 &&
    landmarks.every(
      (landmark, index) =>
        landmark &&
        landmark.id === index &&
        Number.isFinite(landmark.x) &&
        Number.isFinite(landmark.y) &&
        Number.isFinite(landmark.z) &&
        Number.isFinite(landmark.visibility) &&
        Number.isFinite(landmark.confidence),
    );
  return Boolean(
    frame &&
    Number.isFinite(frame.timestampMs) &&
    frame.timestampMs >= 0 &&
    Number.isInteger(frame.frameIndex) &&
    frame.frameIndex >= 0 &&
    Number.isFinite(frame.width) &&
    frame.width > 0 &&
    Number.isFinite(frame.height) &&
    frame.height > 0 &&
    validLandmarks(frame.landmarks) &&
    (frame.worldLandmarks === undefined ||
      validLandmarks(frame.worldLandmarks)),
  );
}

function cloneFrame(frame: PoseFrame): PoseFrame {
  return {
    ...frame,
    landmarks: frame.landmarks.map((landmark) => ({ ...landmark })),
    worldLandmarks: frame.worldLandmarks?.map((landmark) => ({ ...landmark })),
  };
}

export class PoseController {
  private state: PoseControllerState = "idle";
  private readonly analyzer: PoseSwingAnalyzer;
  private readonly v14Bridge = new V14Bridge();
  private readonly v15Bridge = new V15Bridge();
  private readonly v16Bridge = new V16Bridge();
  private readonly v17Bridge = new V17Bridge();
  private readonly frames: PoseFrame[] = [];
  private initialization: Promise<void> | null = null;
  private lastError: string | null = null;

  constructor(
    private readonly adapter: PoseInferenceAdapter,
    config: PosePipelineConfig = defaultPosePipelineConfig,
    private readonly maxFrames = DEFAULT_MAX_FRAMES,
  ) {
    if (!Number.isInteger(maxFrames) || maxFrames <= 0) {
      throw new RangeError("maxFrames must be a positive integer");
    }
    this.analyzer = new PoseSwingAnalyzer(config);
  }

  getState(): PoseControllerState {
    return this.state;
  }

  getFrameCount(): number {
    return this.frames.length;
  }

  getLastError(): string | null {
    return this.lastError;
  }

  async initialize(): Promise<void> {
    if (this.state === "disposed")
      throw new Error("PoseController is disposed");
    if (this.state === "tracking") return;
    if (this.initialization) return this.initialization;

    this.state = "initializing";
    this.lastError = null;
    this.initialization = (async () => {
      try {
        await this.adapter.initialize();
        if (this.state !== "disposed") this.state = "tracking";
      } catch (error) {
        this.lastError = errorMessage(error);
        if (this.state !== "disposed") this.state = "error";
        throw error;
      } finally {
        this.initialization = null;
      }
    })();
    return this.initialization;
  }

  async push(
    frame: unknown,
    timestampMs: number,
    frameIndex: number,
    width: number,
    height: number,
  ): Promise<PoseFrame | null> {
    if (this.state !== "tracking") return null;
    if (
      !Number.isFinite(timestampMs) ||
      timestampMs < 0 ||
      !Number.isInteger(frameIndex) ||
      frameIndex < 0 ||
      !Number.isFinite(width) ||
      width <= 0 ||
      !Number.isFinite(height) ||
      height <= 0
    ) {
      this.lastError = "Invalid frame metadata";
      return null;
    }

    try {
      const result = await this.adapter.infer(
        frame,
        timestampMs,
        frameIndex,
        width,
        height,
      );
      if (!result) {
        this.lastError = null;
        return null;
      }
      if (!isValidPoseFrame(result)) {
        this.lastError =
          "Pose adapter returned an invalid or incomplete landmark frame";
        return null;
      }
      this.lastError = null;
      const storedFrame = cloneFrame(result);
      this.frames.push(storedFrame);
      if (this.frames.length > this.maxFrames) this.frames.shift();
      return cloneFrame(storedFrame);
    } catch (error) {
      this.lastError = errorMessage(error);
      this.state = "error";
      throw error;
    }
  }

  pause(): void {
    if (this.state === "tracking") this.state = "paused";
  }

  resume(): void {
    if (this.state === "paused") this.state = "tracking";
  }

  analyze() {
    try {
      const result = this.analyzer.analyze(this.frames);
      this.lastError = null;
      return result;
    } catch (error) {
      this.lastError = errorMessage(error);
      throw error;
    }
  }

  analyzeV14(camera?: CalibrationFrame): V14Snapshot {
    try {
      const result = this.v14Bridge.analyzeAppFrames(this.frames, camera);
      this.lastError = null;
      return result;
    } catch (error) {
      this.lastError = errorMessage(error);
      throw error;
    }
  }

  analyzeV15(
    camera: V15CameraModel,
    handedness: V15Handedness,
    goal = "consistency",
  ): V15Snapshot {
    try {
      const frames = this.frames.map((frame) => ({
        timestampMs: frame.timestampMs,
        fps: undefined,
        landmarks: frame.landmarks.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
          confidence: landmark.confidence,
          presence: landmark.presence,
        })),
        worldLandmarks: frame.worldLandmarks?.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
          confidence: landmark.confidence,
          presence: landmark.presence,
        })),
      }));
      const result = this.v15Bridge.analyze(frames, camera, handedness, goal);
      this.lastError = null;
      return result;
    } catch (error) {
      this.lastError = errorMessage(error);
      throw error;
    }
  }

  analyzeV16(
    camera: V16CameraCalibration,
    handedness: V16Handedness,
    goal = "consistency",
  ): V16Snapshot {
    try {
      const frames = this.frames.map((frame) => ({
        timestampMs: frame.timestampMs,
        fps: undefined,
        landmarks: frame.landmarks.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
          presence: landmark.presence,
          confidence: landmark.confidence,
        })),
        worldLandmarks: frame.worldLandmarks?.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
          presence: landmark.presence,
          confidence: landmark.confidence,
        })),
      }));
      const result = this.v16Bridge.analyzeAppFrames(
        frames,
        camera,
        handedness,
        goal,
      );
      this.lastError = null;
      return result;
    } catch (error) {
      this.lastError = errorMessage(error);
      throw error;
    }
  }

  analyzeV17(
    camera: V17CameraCalibration,
    handedness: V17Handedness,
    options: V17Options = {},
  ): V17Snapshot {
    try {
      const frames = this.frames.map((frame) => ({
        timestampMs: frame.timestampMs,
        fps: undefined,
        landmarks: frame.landmarks.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
          presence: landmark.presence,
          confidence: landmark.confidence,
        })),
        worldLandmarks: frame.worldLandmarks?.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
          presence: landmark.presence,
          confidence: landmark.confidence,
        })),
      }));
      const result = this.v17Bridge.analyzeAppFrames(
        frames,
        camera,
        handedness,
        options,
      );
      this.lastError = null;
      return result;
    } catch (error) {
      this.lastError = errorMessage(error);
      throw error;
    }
  }

  async dispose(): Promise<void> {
    if (this.state === "disposed") return;
    this.state = "disposed";
    this.frames.length = 0;
    try {
      await this.initialization?.catch(() => undefined);
      await this.adapter.dispose();
    } catch (error) {
      this.lastError = errorMessage(error);
      throw error;
    }
  }
}
