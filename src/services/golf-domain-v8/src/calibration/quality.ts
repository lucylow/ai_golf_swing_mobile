import { CalibrationCoefficients, CalibrationProfileV8 } from './types';

export type CalibrationQuality = {
  calibratedMetrics: number;
  meanRmse: number;
  meanHoldoutRmse: number;
  meanR2: number;
  coverage: number;
  qualityBand: 'insufficient' | 'developing' | 'usable' | 'strong';
};

export function scoreCalibrationQuality(profile: CalibrationProfileV8): CalibrationQuality {
  const coeffs = Object.values(profile.coefficients).filter(Boolean) as CalibrationCoefficients[];
  if (!coeffs.length) return { calibratedMetrics: 0, meanRmse: Infinity, meanHoldoutRmse: Infinity, meanR2: 0, coverage: 0, qualityBand: 'insufficient' };
  const rmse = coeffs.reduce((s, c) => s + c.rmse, 0) / coeffs.length;
  const holdout = Object.values(profile.holdoutRmseByMetric).filter((v): v is number => Number.isFinite(v));
  const meanHoldoutRmse = holdout.length ? holdout.reduce((s, v) => s + v, 0) / holdout.length : Infinity;
  const r2 = coeffs.reduce((s, c) => s + c.r2, 0) / coeffs.length;
  const coverage = Math.min(1, coeffs.length / 10);
  const normalized = (Math.max(0, Math.min(1, r2)) * 0.45) + (Math.max(0, Math.min(1, coverage)) * 0.25) + (Number.isFinite(meanHoldoutRmse) ? 0.3 : 0);
  const qualityBand = normalized >= 0.85 ? 'strong' : normalized >= 0.65 ? 'usable' : normalized >= 0.4 ? 'developing' : 'insufficient';
  return { calibratedMetrics: coeffs.length, meanRmse: rmse, meanHoldoutRmse, meanR2: r2, coverage, qualityBand };
}
