import { fitLinear, LinearFit } from './linearFit';
import { median, mad } from './statistics';

export type RobustFitOptions = {
  delta: number;
  maxIterations: number;
  epsilon: number;
};

function huberWeight(residual: number, delta: number): number {
  const a = Math.abs(residual);
  return a <= delta ? 1 : delta / Math.max(a, 1e-9);
}

export function fitHuber(x: readonly number[], y: readonly number[], options: RobustFitOptions): LinearFit & { weights: number[]; iterations: number } {
  const n = Math.min(x.length, y.length);
  if (n < 2) return { ...fitLinear(x, y), weights: Array.from({ length: n }, () => 1), iterations: 0 };
  const baseline = fitLinear(x, y);
  let intercept = baseline.intercept;
  let scale = baseline.scale;
  const weights = Array.from({ length: n }, () => 1);
  let iterations = 0;
  for (; iterations < options.maxIterations; iterations += 1) {
    const residuals = x.slice(0, n).map((v, i) => (intercept + scale * v) - y[i]);
    const center = median(residuals);
    const spread = Math.max(1e-6, 1.4826 * mad(residuals));
    for (let i = 0; i < n; i += 1) weights[i] = huberWeight((residuals[i] - center) / spread, options.delta);
    const next = fitLinear(x, y, weights);
    if (Math.abs(next.intercept - intercept) < options.epsilon && Math.abs(next.scale - scale) < options.epsilon) {
      intercept = next.intercept;
      scale = next.scale;
      break;
    }
    intercept = next.intercept;
    scale = next.scale;
  }
  const finalFit = fitLinear(x, y, weights);
  return { ...finalFit, weights, iterations: iterations + 1 };
}
