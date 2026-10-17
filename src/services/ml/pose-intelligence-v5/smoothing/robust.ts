import { median } from '../math/scalar';

export function median3(a: number, b: number, c: number): number {
  return median([a, b, c]);
}

export function robustMedian(values: number[], maxDeviation: number): number {
  if (!values.length) return 0;
  const m = median(values);
  const inliers = values.filter((v) => Math.abs(v - m) <= maxDeviation);
  return median(inliers.length ? inliers : [m]);
}

export function huberWeight(residual: number, delta: number): number {
  const abs = Math.abs(residual);
  return abs <= delta ? 1 : delta / Math.max(abs, 1e-9);
}

export function winsorize(values: number[], lowQuantile = 0.05, highQuantile = 0.95): number[] {
  if (!values.length) return [];
  const sorted = [...values].sort((a,b) => a-b);
  const lowIndex = Math.floor((sorted.length - 1) * lowQuantile);
  const highIndex = Math.ceil((sorted.length - 1) * highQuantile);
  const low = sorted[Math.max(0, lowIndex)];
  const high = sorted[Math.min(sorted.length - 1, highIndex)];
  return values.map((v) => Math.min(high, Math.max(low, v)));
}
