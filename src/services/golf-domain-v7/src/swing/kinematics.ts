import { PoseFrame } from '../types';
import { clamp01, mean, standardDeviation } from '../math/statistics';

export type KinematicSnapshot = {
  hipRotationDeg: number;
  shoulderRotationDeg: number;
  xFactorDeg: number;
  leadKneeFlexDeg: number;
  spineTiltDeg: number;
  handHeightRatio: number;
  headMovementPct: number;
  bodyConfidence: number;
};

function point(frame: PoseFrame, name: string) {
  return frame.joints.find((joint) => joint.name === name)?.position;
}

function angle(a: any, b: any, c: any): number {
  if (!a || !b || !c) return 0;
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const mag = Math.hypot(ab.x, ab.y) * Math.hypot(cb.x, cb.y);
  if (!mag) return 0;
  return Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180 / Math.PI;
}

export function extractKinematics(frames: PoseFrame[]): KinematicSnapshot[] {
  return frames.map((frame) => {
    const leftShoulder = point(frame, 'leftShoulder');
    const rightShoulder = point(frame, 'rightShoulder');
    const leftHip = point(frame, 'leftHip');
    const rightHip = point(frame, 'rightHip');
    const leftKnee = point(frame, 'leftKnee');
    const leftAnkle = point(frame, 'leftAnkle');
    const leftWrist = point(frame, 'leftWrist');
    const rightWrist = point(frame, 'rightWrist');
    const hipRotationDeg = Math.atan2((leftHip?.y ?? 0) - (rightHip?.y ?? 0), (leftHip?.x ?? 0) - (rightHip?.x ?? 0)) * 180 / Math.PI;
    const shoulderRotationDeg = Math.atan2((leftShoulder?.y ?? 0) - (rightShoulder?.y ?? 0), (leftShoulder?.x ?? 0) - (rightShoulder?.x ?? 0)) * 180 / Math.PI;
    const xFactorDeg = Math.abs(shoulderRotationDeg - hipRotationDeg);
    const leadKneeFlexDeg = angle(leftHip, leftKnee, leftAnkle);
    const spineTiltDeg = angle(leftShoulder, leftHip, { x: leftHip?.x ?? 0, y: (leftHip?.y ?? 0) + 1, z: 0 });
    const handHeightRatio = Math.abs((leftWrist?.y ?? 0) - (rightWrist?.y ?? 0));
    const headMovementPct = Math.abs(point(frame, 'nose')?.x ?? 0) * 100;
    const confidenceValues = frame.joints.map((joint) => Math.min(joint.visibility, joint.presence));
    return { hipRotationDeg, shoulderRotationDeg, xFactorDeg, leadKneeFlexDeg, spineTiltDeg, handHeightRatio, headMovementPct, bodyConfidence: mean(confidenceValues) };
  });
}

export function summarizeKinematics(snapshots: KinematicSnapshot[]): Record<string, { mean: number; sd: number; confidence: number }> {
  if (!snapshots.length) return {};
  const keys: (keyof KinematicSnapshot)[] = ['hipRotationDeg', 'shoulderRotationDeg', 'xFactorDeg', 'leadKneeFlexDeg', 'spineTiltDeg', 'handHeightRatio', 'headMovementPct'];
  const output: Record<string, { mean: number; sd: number; confidence: number }> = {};
  for (const key of keys) {
    const values = snapshots.map((snapshot) => Number(snapshot[key])).filter(Number.isFinite);
    output[key] = { mean: mean(values), sd: standardDeviation(values), confidence: clamp01(mean(snapshots.map((snapshot) => snapshot.bodyConfidence))) };
  }
  return output;
}

