import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_11: CalibrationMetricKey = 'attackAngleDeg';
export const ADAPTER_11 = { min: -15, max: 15, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_11(value: number): number { return clampMetric(METRIC_11, value); }
export function isPlausible_11(value: number): boolean { return plausible(METRIC_11, value); }
export function percentOfRange_11(value: number): number { return (normalize_11(value) - ADAPTER_11.min) / Math.max(1e-9, ADAPTER_11.max - ADAPTER_11.min); }
export function denormalize_11(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_11.min + u * (ADAPTER_11.max - ADAPTER_11.min); }
export function qualityBand_11(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_11.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_11.holdoutRmse ? 'usable' : 'review'; }
