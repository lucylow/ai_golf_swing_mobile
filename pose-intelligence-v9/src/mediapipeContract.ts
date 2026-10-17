import { NativePoseResult, InferencePacket, PoseRuntime } from './types';
import { combineConfidence } from './confidence';

export type MediaPipeRunningMode = 'IMAGE' | 'VIDEO' | 'LIVE_STREAM';

export type MediaPipeOptionsV9 = {
  runningMode: MediaPipeRunningMode;
  numPoses: 1;
  minPoseDetectionConfidence: number;
  minPosePresenceConfidence: number;
  minTrackingConfidence: number;
  outputSegmentationMasks: boolean;
};

export const defaultMediaPipeOptionsV9: MediaPipeOptionsV9 = {
  runningMode: 'LIVE_STREAM',
  numPoses: 1,
  minPoseDetectionConfidence: 0.5,
  minPosePresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  outputSegmentationMasks: false,
};

export function validateMediaPipeTimestamp(previous: number | null, next: number): { valid: boolean; reason: string | null } {
  if (!Number.isFinite(next)) return { valid: false, reason: 'timestamp_not_finite' };
  if (previous !== null && next <= previous) return { valid: false, reason: 'timestamp_not_monotonic' };
  return { valid: true, reason: null };
}

export function mediaPipeResultToPacket(result: NativePoseResult, latencyMs: number): InferencePacket {
  const landmarks = result.landmarks.map((point, id) => ({
    id,
    x: point.x,
    y: point.y,
    z: point.z,
    visibility: point.visibility ?? point.score ?? 1,
    confidence: combineConfidence(point.score ?? 1, point.visibility ?? 1, point.presence ?? 1),
    presence: point.presence,
  }));
  return {
    runtime: 'mediapipe' satisfies PoseRuntime,
    timestampMs: result.timestampMs,
    landmarks,
    latencyMs,
    detectionConfidence: landmarks.reduce((sum, p) => sum + p.confidence, 0) / Math.max(1, landmarks.length),
    trackingConfidence: landmarks.reduce((sum, p) => sum + p.visibility, 0) / Math.max(1, landmarks.length),
  };
}

export class LiveStreamTimestampGuard {
  private lastTimestamp: number | null = null;
  accept(timestampMs: number): boolean {
    const result = validateMediaPipeTimestamp(this.lastTimestamp, timestampMs);
    if (!result.valid) return false;
    this.lastTimestamp = timestampMs;
    return true;
  }
  reset(): void { this.lastTimestamp = null; }
  last(): number | null { return this.lastTimestamp; }
}
