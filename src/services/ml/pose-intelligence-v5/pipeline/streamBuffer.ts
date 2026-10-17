import { PoseFrame } from '../types/landmarks';

function validLandmarks(landmarks: PoseFrame['landmarks']): boolean {
  return Array.isArray(landmarks) && landmarks.length === 33 && landmarks.every((landmark, index) =>
    landmark && landmark.id === index && Number.isFinite(landmark.x) && Number.isFinite(landmark.y) &&
    Number.isFinite(landmark.z) && Number.isFinite(landmark.confidence) &&
    Number.isFinite(landmark.visibility),
  );
}

function isValidFrame(frame: PoseFrame): boolean {
  return Boolean(
    frame &&
      Number.isFinite(frame.timestampMs) && frame.timestampMs >= 0 &&
      Number.isInteger(frame.frameIndex) && frame.frameIndex >= 0 &&
      Number.isFinite(frame.width) && frame.width > 0 &&
      Number.isFinite(frame.height) && frame.height > 0 &&
      validLandmarks(frame.landmarks) &&
      (frame.worldLandmarks === undefined || validLandmarks(frame.worldLandmarks)),
  );
}

function cloneFrame(frame: PoseFrame): PoseFrame {
  return {
    ...frame,
    landmarks: frame.landmarks.map((landmark) => ({ ...landmark })),
    worldLandmarks: frame.worldLandmarks?.map((landmark) => ({ ...landmark })),
  };
}

export class PoseStreamBuffer {
  private frames: PoseFrame[] = [];

  constructor(private readonly maxFrames = 180) {
    if (!Number.isInteger(maxFrames) || maxFrames <= 0) {
      throw new RangeError('maxFrames must be a positive integer');
    }
  }

  push(frame: PoseFrame): boolean {
    if (!isValidFrame(frame)) return false;
    this.frames.push(cloneFrame(frame));
    if (this.frames.length > this.maxFrames) this.frames.shift();
    return true;
  }

  snapshot(): PoseFrame[] {
    return this.frames.map(cloneFrame);
  }

  clear(): void {
    this.frames = [];
  }

  get length(): number {
    return this.frames.length;
  }
}
