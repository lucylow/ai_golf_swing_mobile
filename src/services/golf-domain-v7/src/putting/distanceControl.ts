import { clamp } from '../math/statistics';
export type PuttingDistanceResult = { expectedRollFt: number; shortLongBiasFt: number; score: number; cue: string };
export function scoreDistanceControl(puttLengthFt: number, firstPuttRemainingFt: number): PuttingDistanceResult {
  const expectedRoll = Math.max(0.3, puttLengthFt * 0.985);
  const bias = firstPuttRemainingFt - 1.2;
  const score = clamp(1 - Math.abs(bias) / Math.max(1.5, puttLengthFt * 0.12), 0, 1);
  const cue = bias > 0.5 ? 'Focus on softer pace and a longer finish-free stroke.' : bias < -0.5 ? 'Commit to a longer roll through the center of the cup.' : 'Pace is close to the target window.';
  return { expectedRollFt: expectedRoll, shortLongBiasFt: bias, score, cue };
}

