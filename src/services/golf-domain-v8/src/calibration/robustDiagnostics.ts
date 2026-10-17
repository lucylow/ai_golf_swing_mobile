import { CalibrationSample, CalibrationMetricKey } from './types';
import { median, mad, mean, rmse } from './statistics';
export type RobustDiagnostic = { metric: CalibrationMetricKey; count: number; medianResidual: number; madResidual: number; rmse: number; outlierFraction: number; stable: boolean; };
export function diagnoseMetric(samples: readonly CalibrationSample[], intercept: number, scale: number): RobustDiagnostic {
  const residuals = samples.map((s) => intercept + scale * s.appValue - s.referenceValue).filter(Number.isFinite);
  const m = median(residuals); const spread = mad(residuals);
  const threshold = Math.max(0.5, spread * 3.5);
  const outliers = residuals.filter((r) => Math.abs(r - m) > threshold).length;
  return { metric: samples[0]?.metric ?? 'carryYards', count: residuals.length, medianResidual: m, madResidual: spread, rmse: rmse(residuals.map(() => 0), residuals), outlierFraction: residuals.length ? outliers / residuals.length : 1, stable: residuals.length >= 12 && outliers / Math.max(1, residuals.length) < 0.15 };
}
export function residualBias(samples: readonly CalibrationSample[], intercept: number, scale: number): number { return mean(samples.map((s) => intercept + scale * s.appValue - s.referenceValue)); }
