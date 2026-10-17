import { mae, mean, rmse, r2 } from './statistics';

export type LinearFit = {
  intercept: number;
  scale: number;
  rmse: number;
  mae: number;
  bias: number;
  r2: number;
};

export function fitLinear(x: readonly number[], y: readonly number[], weights?: readonly number[]): LinearFit {
  const n = Math.min(x.length, y.length);
  if (n < 2) return { intercept: 0, scale: 1, rmse: Infinity, mae: Infinity, bias: Infinity, r2: 0 };
  let sw = 0;
  let sx = 0;
  let sy = 0;
  let sxx = 0;
  let sxy = 0;
  for (let i = 0; i < n; i += 1) {
    const w = Math.max(1e-6, weights?.[i] ?? 1);
    sw += w;
    sx += w * x[i];
    sy += w * y[i];
    sxx += w * x[i] * x[i];
    sxy += w * x[i] * y[i];
  }
  const det = sw * sxx - sx * sx;
  const scale = Math.abs(det) < 1e-9 ? 1 : (sw * sxy - sx * sy) / det;
  const intercept = (sy - scale * sx) / Math.max(sw, 1e-9);
  const predicted = x.slice(0, n).map((v) => intercept + scale * v);
  const actual = y.slice(0, n);
  const errors = predicted.map((p, i) => p - actual[i]);
  return { intercept, scale, rmse: rmse(actual, predicted), mae: mae(actual, predicted), bias: mean(errors), r2: r2(actual, predicted) };
}
