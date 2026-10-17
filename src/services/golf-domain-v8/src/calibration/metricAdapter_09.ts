import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_09: CalibrationMetricKey = 'smashFactor';
export const ADAPTER_09 = { min: 0.5, max: 1.7, holdoutRmse: 0.08, kind: 'ratio' as const };
export function normalize_09(value: number): number { return clampMetric(METRIC_09, value); }
export function isPlausible_09(value: number): boolean { return plausible(METRIC_09, value); }
export function percentOfRange_09(value: number): number { return (normalize_09(value) - ADAPTER_09.min) / Math.max(1e-9, ADAPTER_09.max - ADAPTER_09.min); }
export function denormalize_09(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_09.min + u * (ADAPTER_09.max - ADAPTER_09.min); }
export function qualityBand_09(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_09.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_09.holdoutRmse ? 'usable' : 'review'; }
