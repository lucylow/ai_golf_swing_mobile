export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + ((b - a) * t);
}

export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  return Math.abs(denominator) < 1e-9 || !Number.isFinite(denominator) ? fallback : numerator / denominator;
}

export function mean(values: number[], fallback = 0): number {
  if (!values.length) return fallback;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function weightedMean(values: number[], weights: number[], fallback = 0): number {
  let weighted = 0;
  let total = 0;
  for (let i = 0; i < values.length; i += 1) {
    const w = Math.max(0, weights[i] ?? 0);
    weighted += values[i] * w;
    total += w;
  }
  return total > 1e-9 ? weighted / total : fallback;
}

export function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return mean(values.map((v) => (v - m) ** 2));
}

export function standardDeviation(values: number[]): number {
  return Math.sqrt(Math.max(0, variance(values)));
}

export function median(values: number[], fallback = 0): number {
  if (!values.length) return fallback;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function quantile(values: number[], q: number, fallback = 0): number {
  if (!values.length) return fallback;
  const sorted = [...values].sort((a, b) => a - b);
  const pos = clamp(q, 0, 1) * (sorted.length - 1);
  const lower = Math.floor(pos);
  const upper = Math.ceil(pos);
  return lerp(sorted[lower], sorted[upper], pos - lower);
}

export function wrapAngleDegrees(deg: number): number {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}
