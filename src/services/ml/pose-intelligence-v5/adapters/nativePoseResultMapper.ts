import { ExternalLandmark, ExternalPoseResult } from '../types/adapter';
import { PoseLandmark, PoseLandmarkId, clamp01 } from '../types/landmarks';

const LANDMARK_COUNT = 33;

type NativeLandmark = {
  x?: number;
  y?: number;
  z?: number;
  visibility?: number;
  presence?: number;
} | null | undefined;

export type NativePoseLike = {
  landmarks?: NativeLandmark[];
  worldLandmarks?: NativeLandmark[];
  detectionConfidence?: number;
  trackingConfidence?: number;
} | null;

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function mapLandmarks(items: NativeLandmark[] | undefined): ExternalLandmark[] {
  return Array.from({ length: LANDMARK_COUNT }, (_, index) => {
    const item = items?.[index];
    if (!item || !finite(item.x) || !finite(item.y)) {
      return { x: 0, y: 0, z: 0, visibility: 0, presence: 0 };
    }
    const visibility = clamp01(finite(item.visibility) ? item.visibility : 0);
    const presence = clamp01(finite(item.presence) ? item.presence : visibility);
    return {
      x: item.x,
      y: item.y,
      z: finite(item.z) ? item.z : 0,
      visibility,
      presence,
    };
  });
}

export function mapNativePoseResult(input: NativePoseLike | undefined): ExternalPoseResult | null {
  if (!input || !Array.isArray(input.landmarks) || input.landmarks.length === 0) {
    return null;
  }
  return {
    landmarks: mapLandmarks(input.landmarks),
    worldLandmarks: Array.isArray(input.worldLandmarks)
      ? mapLandmarks(input.worldLandmarks)
      : undefined,
    detectionConfidence: finite(input.detectionConfidence)
      ? clamp01(input.detectionConfidence)
      : 0,
    trackingConfidence: finite(input.trackingConfidence)
      ? clamp01(input.trackingConfidence)
      : 0,
  };
}

export function createEmptyLandmarks(count = LANDMARK_COUNT): PoseLandmark[] {
  const safeCount = Number.isFinite(count)
    ? Math.max(0, Math.min(LANDMARK_COUNT, Math.floor(count)))
    : LANDMARK_COUNT;
  return Array.from({ length: safeCount }, (_, id) => ({
    id: id as PoseLandmarkId,
    x: 0,
    y: 0,
    z: 0,
    visibility: 0,
    presence: 0,
    confidence: 0,
  }));
}
