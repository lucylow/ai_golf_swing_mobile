import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_13: CalibrationMetricKey = 'dynamicLoftDeg';
export const ADAPTER_13 = { min: 0, max: 60, holdoutRmse: 2.5, kind: 'angle' as const };
export function normalize_13(value: number): number { return clampMetric(METRIC_13, value); }
export function isPlausible_13(value: number): boolean { return plausible(METRIC_13, value); }
export function percentOfRange_13(value: number): number { return (normalize_13(value) - ADAPTER_13.min) / Math.max(1e-9, ADAPTER_13.max - ADAPTER_13.min); }
export function denormalize_13(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_13.min + u * (ADAPTER_13.max - ADAPTER_13.min); }
export function qualityBand_13(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_13.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_13.holdoutRmse ? 'usable' : 'review'; }
