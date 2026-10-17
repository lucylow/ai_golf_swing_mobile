import { PoseFrame, Vec2 } from './types';
import { clamp01 } from './math';

export type Roi = { x: number; y: number; width: number; height: number };
export type OpticalFlowPoint = { previous: Vec2; current: Vec2; confidence: number };

export function roiFromPose(frame: PoseFrame): Roi {
  if (!frame.landmarks.length) return { x: 0, y: 0, width: 1, height: 1 };
  const xs = frame.landmarks.map(p => p.x);
  const ys = frame.landmarks.map(p => p.y);
  const minX = Math.max(0, Math.min(...xs) - 0.08);
  const maxX = Math.min(1, Math.max(...xs) + 0.08);
  const minY = Math.max(0, Math.min(...ys) - 0.08);
  const maxY = Math.min(1, Math.max(...ys) + 0.08);
  return { x: minX, y: minY, width: Math.max(0.05, maxX - minX), height: Math.max(0.05, maxY - minY) };
}

export function opticalFlowConfidence(points: OpticalFlowPoint[]): number {
  if (!points.length) return 0;
  const meanConfidence = points.reduce((sum, p) => sum + p.confidence, 0) / points.length;
  return clamp01(meanConfidence);
}

export function acceptFallbackFrame(flowConfidence: number, poseConfidence: number, threshold = 0.55): boolean {
  return clamp01(0.45 * flowConfidence + 0.55 * poseConfidence) >= threshold;
}
