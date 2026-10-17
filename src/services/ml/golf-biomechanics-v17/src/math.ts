export const clamp = (value: number, min = 0, max = 1): number => {
  return Math.min(max, Math.max(min, value));
};

export const mean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const sum = (values: number[]): number => values.reduce((a, b) => a + b, 0);

export const variance = (values: number[]): number => {
  if (values.length === 0) return 0;
  const m = mean(values);
  return mean(values.map(value => (value - m) ** 2));
};

export const std = (values: number[]): number => Math.sqrt(variance(values));

export const median = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
};

export const dot = (a: number[], b: number[]): number => {
  const n = Math.min(a.length, b.length);
  let total = 0;
  for (let i = 0; i < n; i += 1) total += a[i] * b[i];
  return total;
};

export const norm = (values: number[]): number => Math.sqrt(dot(values, values));

export const normalize = (values: number[]): number[] => {
  const n = norm(values);
  return n < 1e-9 ? values.map(() => 0) : values.map(value => value / n);
};

export const add = (a: number[], b: number[]): number[] => a.map((v, i) => v + (b[i] ?? 0));
export const sub = (a: number[], b: number[]): number[] => a.map((v, i) => v - (b[i] ?? 0));
export const scale = (a: number[], s: number): number[] => a.map(value => value * s);

export const angleDeg = (a: number[], b: number[]): number => {
  const denominator = norm(a) * norm(b);
  if (denominator < 1e-9) return 0;
  return Math.acos(clamp(dot(a, b) / denominator, -1, 1)) * 180 / Math.PI;
};

export const atanDeg = (y: number, x: number): number => Math.atan2(y, x) * 180 / Math.PI;
export const wrapDeg = (value: number): number => ((value + 180) % 360 + 360) % 360 - 180;
export const diffAngleDeg = (a: number, b: number): number => wrapDeg(a - b);
export const rms = (values: number[]): number => Math.sqrt(mean(values.map(v => v * v)));
export const finite = (value: number): number => Number.isFinite(value) ? value : 0;
export const quantile = (values: number[], q: number): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * clamp(q, 0, 1);
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  const weight = position - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};

export const smooth3 = (values: number[]): number[] => values.map((value, i) => (values[i - 1] ?? value) * 0.25 + value * 0.5 + (values[i + 1] ?? value) * 0.25);
export const argMax = (values: number[]): number => { if (!values.length) return -1; let index=0; for(let i=1;i<values.length;i+=1) if(values[i]>values[index]) index=i; return index; };
