export function finite(values: readonly number[]): number[] {
  return values.filter((v) => Number.isFinite(v));
}
export function mean(values: readonly number[]): number {
  const xs = finite(values);
  if (!xs.length) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
export function variance(values: readonly number[]): number {
  const xs = finite(values);
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1);
}
export function rmse(actual: readonly number[], predicted: readonly number[]): number {
  const n = Math.min(actual.length, predicted.length);
  if (!n) return 0;
  let s = 0;
  for (let i = 0; i < n; i += 1) s += (predicted[i] - actual[i]) ** 2;
  return Math.sqrt(s / n);
}
export function mae(actual: readonly number[], predicted: readonly number[]): number {
  const n = Math.min(actual.length, predicted.length);
  if (!n) return 0;
  let s = 0;
  for (let i = 0; i < n; i += 1) s += Math.abs(predicted[i] - actual[i]);
  return s / n;
}
export function r2(actual: readonly number[], predicted: readonly number[]): number {
  const n = Math.min(actual.length, predicted.length);
  if (n < 2) return 0;
  const m = mean(actual.slice(0, n));
  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i += 1) {
    ssRes += (predicted[i] - actual[i]) ** 2;
    ssTot += (actual[i] - m) ** 2;
  }
  return ssTot <= 1e-12 ? 0 : 1 - ssRes / ssTot;
}
export function median(values: readonly number[]): number {
  const xs = finite(values).slice().sort((a, b) => a - b);
  if (!xs.length) return 0;
  const mid = Math.floor(xs.length / 2);
  return xs.length % 2 ? xs[mid] : (xs[mid - 1] + xs[mid]) / 2;
}
export function mad(values: readonly number[]): number {
  const m = median(values);
  return median(values.map((v) => Math.abs(v - m)));
}
