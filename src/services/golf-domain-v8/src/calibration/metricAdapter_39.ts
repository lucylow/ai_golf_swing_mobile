import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_39: CalibrationMetricKey = 'smashFactor';
export const ADAPTER_39 = { min: 0.5, max: 1.7, holdoutRmse: 0.08, kind: 'ratio' as const };
export function normalize_39(value: number): number { return clampMetric(METRIC_39, value); }
export function isPlausible_39(value: number): boolean { return plausible(METRIC_39, value); }
export function percentOfRange_39(value: number): number { return (normalize_39(value) - ADAPTER_39.min) / Math.max(1e-9, ADAPTER_39.max - ADAPTER_39.min); }
export function denormalize_39(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_39.min + u * (ADAPTER_39.max - ADAPTER_39.min); }
export function qualityBand_39(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_39.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_39.holdoutRmse ? 'usable' : 'review'; }
