import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_30: CalibrationMetricKey = 'closureRateDegPerSec';
export const ADAPTER_30 = { min: 0, max: 3000, holdoutRmse: 120, kind: 'speed' as const };
export function normalize_30(value: number): number { return clampMetric(METRIC_30, value); }
export function isPlausible_30(value: number): boolean { return plausible(METRIC_30, value); }
export function percentOfRange_30(value: number): number { return (normalize_30(value) - ADAPTER_30.min) / Math.max(1e-9, ADAPTER_30.max - ADAPTER_30.min); }
export function denormalize_30(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_30.min + u * (ADAPTER_30.max - ADAPTER_30.min); }
export function qualityBand_30(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_30.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_30.holdoutRmse ? 'usable' : 'review'; }
