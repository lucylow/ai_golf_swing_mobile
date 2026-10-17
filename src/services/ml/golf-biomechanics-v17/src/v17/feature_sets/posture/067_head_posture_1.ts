import { PoseFrame, Handedness } from '../../../types';
import { LM } from '../../../landmarks';
import { clamp, mean, std, median } from '../../math/stats';
import { distance, angleDeg } from '../../geometry/vec3';

export interface FeatureOutput {
  value: number;
  confidence: number;
  phase: string;
  flags: string[];
  evidence: string[];
}

export function visibilityScore(frames: PoseFrame[]): number {
  if (!frames.length) return 0;
  const values = frames.map((f) => mean([
    f.landmarks[LM.leftShoulder]?.visibility ?? 0,
    f.landmarks[LM.rightShoulder]?.visibility ?? 0,
    f.landmarks[LM.leftHip]?.visibility ?? 0,
    f.landmarks[LM.rightHip]?.visibility ?? 0,
  ]));
  return clamp(mean(values));
}

export function timeline(frames: PoseFrame[]): number[] {
  return frames.map((f) => f.timestampMs);
}

export function normalizedDelta(a: number, b: number): number {
  return clamp((a - b) * 2, -1, 1);
}

export function stablePhase(frames: PoseFrame[], p: number): PoseFrame {
  if (!frames.length) throw new Error('feature requires frames');
  return frames[Math.max(0, Math.min(frames.length - 1, Math.floor(frames.length * p)))];
}

export function wristDistance(frame: PoseFrame, h: Handedness): number {
  const lead = h === 'right' ? LM.leftWrist : LM.rightWrist;
  const trail = h === 'right' ? LM.rightWrist : LM.leftWrist;
  return distance(frame.landmarks[lead], frame.landmarks[trail]);
}

export function jointAngle(frame: PoseFrame, a: number, b: number, c: number): number {
  return angleDeg({
    x: frame.landmarks[a].x - frame.landmarks[b].x,
    y: frame.landmarks[a].y - frame.landmarks[b].y,
    z: frame.landmarks[a].z - frame.landmarks[b].z,
  }, {
    x: frame.landmarks[c].x - frame.landmarks[b].x,
    y: frame.landmarks[c].y - frame.landmarks[b].y,
    z: frame.landmarks[c].z - frame.landmarks[b].z,
  });
}

export function spread(values: number[]): number { return std(values); }
export function center(values: number[]): number { return median(values); }

export function compute67(frames: PoseFrame[], handedness: Handedness): FeatureOutput {
  const flags: string[] = [];
  const evidence = ['33-landmark pose', 'temporal sequence', 'posture feature'];
  if (frames.length < 10) flags.push('short sequence');
  const confidence = visibilityScore(frames);
  const f = stablePhase(frames, 0.54);
  const g = stablePhase(frames, 0.77);
  const value=jointAngle(f,LM.leftShoulder,LM.leftHip,LM.leftKnee);
  const safeValue = Number.isFinite(value) ? value : 0;
  return { value: safeValue, confidence, phase: 'P8', flags, evidence };
}

export function normalize67(value:number,low:number,high:number):number {
  return clamp((value-low)/Math.max(0.0001,high-low));
}

export function compare67(current:number,baseline:number) {
  const delta=current-baseline;
  return { delta, magnitude:Math.abs(delta), direction:delta>0?'higher':delta<0?'lower':'same' as 'higher'|'lower'|'same' };
}

export function confidenceAdjusted67(value:number,confidence:number):number {
  return value * clamp(confidence);
}

export function summary67(frames:PoseFrame[],handedness:Handedness) {
  const x=compute67(frames,handedness);
  return {feature:'head',family:'posture',value:x.value,confidence:x.confidence,phase:x.phase,flags:x.flags};
}
