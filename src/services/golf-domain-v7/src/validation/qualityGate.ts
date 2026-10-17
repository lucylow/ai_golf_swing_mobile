import { PoseFrame } from '../types';
import { mean } from '../math/statistics';
export type GolfQualityGate = { accepted: boolean; score: number; reasons: string[] };
export function evaluateGolfSequence(frames: PoseFrame[]): GolfQualityGate {
  const reasons: string[] = [];
  if (frames.length < 8) reasons.push('Too few frames for temporal swing context.');
  const visibility = frames.map((frame) => frame.joints.length ? mean(frame.joints.map((joint) => Math.min(joint.visibility, joint.presence))) : 0);
  const frameQuality = frames.map((frame) => frame.frameQuality);
  const score = visibility.length ? mean(visibility) * 0.65 + mean(frameQuality) * 0.35 : 0;
  if (mean(frameQuality) < 0.45) reasons.push('Video quality is low.');
  if (mean(visibility) < 0.5) reasons.push('Pose visibility is low.');
  return { accepted: score >= 0.56 && frames.length >= 8, score, reasons };
}

