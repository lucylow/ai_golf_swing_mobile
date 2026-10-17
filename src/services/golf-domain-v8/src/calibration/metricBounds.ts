import { CalibrationMetricKey } from './types';
export type MetricBound = { min: number; max: number; maxStep: number; unit: string };
export const METRIC_BOUNDS_V8: Record<CalibrationMetricKey, MetricBound> = {
  ballSpeedMph: { min: 10, max: 210, maxStep: 30, unit: 'mph' },
  launchAngleDeg: { min: -10, max: 45, maxStep: 8, unit: 'deg' },
  azimuthDeg: { min: -45, max: 45, maxStep: 10, unit: 'deg' },
  spinRpm: { min: 100, max: 12000, maxStep: 3000, unit: 'rpm' },
  spinAxisDeg: { min: -60, max: 60, maxStep: 30, unit: 'deg' },
  carryYards: { min: 5, max: 400, maxStep: 80, unit: 'yd' },
  totalYards: { min: 5, max: 450, maxStep: 100, unit: 'yd' },
  clubSpeedMph: { min: 20, max: 150, maxStep: 25, unit: 'mph' },
  smashFactor: { min: 0.5, max: 1.7, maxStep: 0.25, unit: 'x' },
  clubPathDeg: { min: -20, max: 20, maxStep: 8, unit: 'deg' },
  attackAngleDeg: { min: -15, max: 15, maxStep: 8, unit: 'deg' },
  faceAngleDeg: { min: -20, max: 20, maxStep: 8, unit: 'deg' },
  dynamicLoftDeg: { min: 0, max: 60, maxStep: 15, unit: 'deg' },
  impactOffsetMm: { min: -30, max: 30, maxStep: 20, unit: 'mm' },
  closureRateDegPerSec: { min: 0, max: 3000, maxStep: 900, unit: 'deg/s' },
};
export function clampMetric(metric: CalibrationMetricKey, value: number): number { const b = METRIC_BOUNDS_V8[metric]; return Math.max(b.min, Math.min(b.max, value)); }
export function plausible(metric: CalibrationMetricKey, value: number): boolean { const b = METRIC_BOUNDS_V8[metric]; return Number.isFinite(value) && value >= b.min && value <= b.max; }
