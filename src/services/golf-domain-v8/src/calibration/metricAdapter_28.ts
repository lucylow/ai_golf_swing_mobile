import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_28: CalibrationMetricKey = 'dynamicLoftDeg';
export const ADAPTER_28 = { min: 0, max: 60, holdoutRmse: 2.5, kind: 'angle' as const };
export function normalize_28(value: number): number { return clampMetric(METRIC_28, value); }
export function isPlausible_28(value: number): boolean { return plausible(METRIC_28, value); }
export function percentOfRange_28(value: number): number { return (normalize_28(value) - ADAPTER_28.min) / Math.max(1e-9, ADAPTER_28.max - ADAPTER_28.min); }
export function denormalize_28(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_28.min + u * (ADAPTER_28.max - ADAPTER_28.min); }
export function qualityBand_28(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_28.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_28.holdoutRmse ? 'usable' : 'review'; }
