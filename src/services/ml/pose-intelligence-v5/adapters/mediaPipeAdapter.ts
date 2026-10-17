import { ExternalLandmark, ExternalPoseResult, PoseInferenceAdapter } from '../types/adapter';
import { PoseFrame, PoseLandmark, PoseLandmarkId, clamp01 } from '../types/landmarks';

const LANDMARK_COUNT = 33;

type UnknownLandmark = Partial<ExternalLandmark> | null | undefined;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function confidenceValue(value: unknown, fallback: number): number {
  return clamp01(isFiniteNumber(value) ? value : fallback);
}

function mapLandmarks(input: UnknownLandmark[] | undefined): PoseLandmark[] {
  return Array.from({ length: LANDMARK_COUNT }, (_, index) => {
    const landmark = input?.[index];
    if (!landmark || !isFiniteNumber(landmark.x) || !isFiniteNumber(landmark.y)) {
      return {
        id: index as PoseLandmarkId,
        x: 0,
        y: 0,
        z: 0,
        visibility: 0,
        presence: 0,
        confidence: 0,
      };
    }

    const z = isFiniteNumber(landmark.z) ? landmark.z : 0;
    const visibility = confidenceValue(landmark.visibility, 1);
    const presence = confidenceValue(landmark.presence, visibility);
    return {
      id: index as PoseLandmarkId,
      x: landmark.x,
      y: landmark.y,
      z,
      visibility,
      presence,
      confidence: clamp01(visibility * 0.7 + presence * 0.3),
    };
  });
}

export class MediaPipePoseAdapter implements PoseInferenceAdapter {
  private initialized = false;

  async initialize(): Promise<void> {
    this.initialized = true;
  }

  async infer(
    frame: unknown,
    timestampMs: number,
    frameIndex: number,
    width: number,
    height: number,
  ): Promise<PoseFrame | null> {
    if (!this.initialized) {
      throw new Error('MediaPipePoseAdapter must be initialized before infer()');
    }
    if (
      !isFiniteNumber(timestampMs) || timestampMs < 0 ||
      !Number.isInteger(frameIndex) || frameIndex < 0 ||
      !isFiniteNumber(width) || width <= 0 ||
      !isFiniteNumber(height) || height <= 0
    ) {
      return null;
    }

    const result = frame as ExternalPoseResult | null;
    if (!result || !Array.isArray(result.landmarks) || result.landmarks.length === 0) {
      return null;
    }

    return {
      timestampMs,
      frameIndex,
      width,
      height,
      landmarks: mapLandmarks(result.landmarks as UnknownLandmark[]),
      worldLandmarks: Array.isArray(result.worldLandmarks)
        ? mapLandmarks(result.worldLandmarks as UnknownLandmark[])
        : undefined,
      detectionConfidence: isFiniteNumber(result.detectionConfidence)
        ? clamp01(result.detectionConfidence)
        : undefined,
      trackingConfidence: isFiniteNumber(result.trackingConfidence)
        ? clamp01(result.trackingConfidence)
        : undefined,
    };
  }

  async dispose(): Promise<void> {
    this.initialized = false;
  }
}
