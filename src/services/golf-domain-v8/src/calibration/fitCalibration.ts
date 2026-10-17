import { CalibrationFitOptions, CalibrationMetricKey, CalibrationProfileV8, CalibrationReport, CalibrationSample } from './types';
import { fitHuber } from './robustFit';
import { finite, mean, rmse } from './statistics';

export const DEFAULT_CALIBRATION_OPTIONS: CalibrationFitOptions = {
  minSamples: 12,
  huberDelta: 1.5,
  ridgeLambda: 1e-6,
  holdoutFraction: 0.2,
  maxIterations: 40,
  convergenceEpsilon: 1e-7,
};

function split(samples: CalibrationSample[], holdoutFraction: number): { train: CalibrationSample[]; holdout: CalibrationSample[] } {
  const ordered = samples.slice().sort((a, b) => (a.timestampMs ?? 0) - (b.timestampMs ?? 0));
  const holdoutSize = Math.max(1, Math.floor(ordered.length * holdoutFraction));
  return { train: ordered.slice(0, Math.max(2, ordered.length - holdoutSize)), holdout: ordered.slice(-holdoutSize) };
}

export function fitLaunchMonitorCalibration(
  samples: readonly CalibrationSample[],
  deviceLabel: string,
  id = `cal-${Date.now()}`,
  options: Partial<CalibrationFitOptions> = {},
): CalibrationReport {
  const cfg = { ...DEFAULT_CALIBRATION_OPTIONS, ...options };
  const byMetric = new Map<CalibrationMetricKey, CalibrationSample[]>();
  for (const sample of samples) {
    if (!Number.isFinite(sample.appValue) || !Number.isFinite(sample.referenceValue)) continue;
    const bucket = byMetric.get(sample.metric) ?? [];
    bucket.push(sample);
    byMetric.set(sample.metric, bucket);
  }
  const coefficients: CalibrationProfileV8['coefficients'] = {};
  const holdout: CalibrationProfileV8['holdoutRmseByMetric'] = {};
  const warnings: string[] = [];
  const recommendations: string[] = [];
  for (const [metric, bucket] of byMetric.entries()) {
    if (bucket.length < cfg.minSamples) {
      warnings.push(`${metric}: only ${bucket.length} paired samples; minimum is ${cfg.minSamples}.`);
      continue;
    }
    const { train, holdout: ho } = split(bucket, cfg.holdoutFraction);
    const fit = fitHuber(train.map((s) => s.appValue), train.map((s) => s.referenceValue), {
      delta: cfg.huberDelta,
      maxIterations: cfg.maxIterations,
      epsilon: cfg.convergenceEpsilon,
    });
    const predictedHoldout = ho.map((s) => fit.intercept + fit.scale * s.appValue);
    const actualHoldout = ho.map((s) => s.referenceValue);
    holdout[metric] = rmse(actualHoldout, predictedHoldout);
    const residualBias = mean(bucket.map((s) => (fit.intercept + fit.scale * s.appValue) - s.referenceValue));
    const inlierCount = fit.weights.filter((w) => w >= 0.5).length;
    coefficients[metric] = {
      metric,
      intercept: fit.intercept,
      scale: fit.scale,
      rmse: fit.rmse,
      mae: fit.mae,
      bias: residualBias,
      r2: fit.r2,
      sampleCount: bucket.length,
      inlierCount,
      minReference: Math.min(...bucket.map((s) => s.referenceValue)),
      maxReference: Math.max(...bucket.map((s) => s.referenceValue)),
    };
    if (Math.abs(fit.scale - 1) > 0.1) recommendations.push(`${metric}: learned scale differs materially from 1.0.`);
    if (Math.abs(residualBias) > Math.max(0.25, fit.rmse * 0.5)) recommendations.push(`${metric}: residual bias remains visible after calibration.`);
  }
  const profile: CalibrationProfileV8 = {
    id,
    deviceLabel,
    createdAt: new Date().toISOString(),
    version: 8,
    coefficients,
    sampleCount: [...byMetric.values()].reduce((s, x) => s + x.length, 0),
    holdoutRmseByMetric: holdout,
    notes: ['Robust Huber-weighted affine fit.', 'Holdout set taken from the latest paired samples.', 'Numerical corrections should be validated against independent reference shots before production use.'],
  };
  const pass = Object.keys(coefficients).length >= 4 && warnings.length === 0 && Object.values(holdout).every((v) => Number.isFinite(v));
  return { profile, pass, warnings, recommendations };
}
