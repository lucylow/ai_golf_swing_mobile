import { mean, standardDeviation } from '../math/statistics';
export function sessionConsistency(values: number[]): { mean: number; variability: number; score: number } {
  const m = mean(values);
  const variability = standardDeviation(values);
  const score = Math.max(0, 1 - variability / Math.max(1, Math.abs(m)));
  return { mean: m, variability, score };
}

