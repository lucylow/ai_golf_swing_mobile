import { PoseFrame, Handedness } from './types';
import { LM } from './landmarks';
import { atanDeg, diffAngleDeg } from './math';

export function lineAngle(frame: PoseFrame, a: number, b: number): number {
  const p = frame.landmarks[a];
  const q = frame.landmarks[b];
  return atanDeg(q.z - p.z, q.x - p.x);
}

export function xFactor(frame: PoseFrame, handedness: Handedness): number {
  const shoulder = lineAngle(frame, LM.leftShoulder, LM.rightShoulder);
  const pelvis = lineAngle(frame, LM.leftHip, LM.rightHip);
  const handednessSign = handedness === 'right' ? 1 : -1;
  return handednessSign * diffAngleDeg(shoulder, pelvis);
}

export function xFactorSeries(frames: PoseFrame[], handedness: Handedness): number[] {
  return frames.map(frame => xFactor(frame, handedness));
}

export function xFactorMax(frames: PoseFrame[], handedness: Handedness): number {
  const values = xFactorSeries(frames, handedness);
  return values.length ? Math.max(...values) : 0;
}

export function xFactorStretch(frames: PoseFrame[], handedness: Handedness): number {
  const values = xFactorSeries(frames, handedness);
  if (!values.length) return 0;
  const topIndex = Math.max(0, Math.floor(values.length * 0.42));
  const impactIndex = Math.max(0, Math.floor(values.length * 0.65));
  return values[topIndex] - values[impactIndex];
}
