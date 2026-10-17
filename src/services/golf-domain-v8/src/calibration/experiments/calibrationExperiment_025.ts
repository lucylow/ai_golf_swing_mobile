import { CalibrationSample } from '../types';
import { median, mad } from '../statistics';
import { clampMetric, plausible } from '../metricBounds';

export type ExperimentResult25 = {
  metric: CalibrationSample['metric'];
  accepted: number;
  rejected: number;
  medianResidual: number;
  madResidual: number;
  driftScore: number;
  unit: 'mph' | 'deg' | 'rpm' | 'yd' | 'x' | 'mm' | 'deg/s';
  recommendation: 'accept' | 'review' | 'reacquire';
};

const METRIC: CalibrationSample['metric'] = 'clubPathDeg';
const WINDOW = 8 + 25;
const DRIFT_LIMIT = 0.03 + (25 % 7) * 0.005;

function residual(sample: CalibrationSample): number {
  return sample.appValue - sample.referenceValue;
}

function robustScale(values: number[]): number {
  return Math.max(0.0001, 1.4826 * mad(values));
}

function drift(values: number[]): number {
  if (values.length < WINDOW) return 1;
  const split = Math.floor(values.length / 2);
  const a = median(values.slice(0, split));
  const b = median(values.slice(split));
  return Math.abs(b - a) / Math.max(0.001, Math.abs(a) + Math.abs(b) + 1);
}

function unitFor(metric: CalibrationSample['metric']): ExperimentResult25['unit'] {
  if (metric.includes('Speed')) return 'mph';
  if (metric.includes('Angle') || metric.includes('Path') || metric.includes('Loft') || metric.includes('Axis')) return 'deg';
  if (metric.includes('spin') || metric === 'spinRpm') return 'rpm';
  if (metric.includes('carry') || metric.includes('total') || metric.includes('Offset')) return metric === 'impactOffsetMm' ? 'mm' : 'yd';
  if (metric === 'smashFactor') return 'x';
  return 'deg/s';
}

export function runCalibrationExperiment25(samples: readonly CalibrationSample[]): ExperimentResult25 {
  const usable = samples.filter((s) => s.metric === METRIC && plausible(METRIC, s.appValue) && plausible(METRIC, s.referenceValue));
  const residuals = usable.map(residual);
  const scale = robustScale(residuals);
  const accepted = usable.filter((s) => Math.abs(residual(s) - median(residuals)) <= Math.max(1, scale * 3)).length;
  const rejected = usable.length - accepted;
  const driftScore = drift(residuals);
  const recommendation = usable.length < 10 ? 'reacquire' : driftScore > DRIFT_LIMIT ? 'review' : rejected / Math.max(1, usable.length) > 0.15 ? 'review' : 'accept';
  return { metric: METRIC, accepted, rejected, medianResidual: median(residuals), madResidual: mad(residuals), driftScore, unit: unitFor(METRIC), recommendation };
}

export function normalizeExperimentValue25(value: number): number {
  return clampMetric(METRIC, value);
}

export function shouldExcludeExperimentSample25(appValue: number, referenceValue: number): boolean {
  if (!plausible(METRIC, appValue) || !plausible(METRIC, referenceValue)) return true;
  return Math.abs(appValue - referenceValue) > Math.max(5, 25 * 0.5);
}

export function experimentNote25(): string {
  return `Experiment 25 evaluates ${METRIC} calibration for robust acceptance and drift screening.`;
}
