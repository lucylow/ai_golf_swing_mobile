import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_20: CalibrationMetricKey = 'spinAxisDeg';
export const ADAPTER_20 = { min: -60, max: 60, holdoutRmse: 3.0, kind: 'angle' as const };
export function normalize_20(value: number): number { return clampMetric(METRIC_20, value); }
export function isPlausible_20(value: number): boolean { return plausible(METRIC_20, value); }
export function percentOfRange_20(value: number): number { return (normalize_20(value) - ADAPTER_20.min) / Math.max(1e-9, ADAPTER_20.max - ADAPTER_20.min); }
export function denormalize_20(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_20.min + u * (ADAPTER_20.max - ADAPTER_20.min); }
export function qualityBand_20(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_20.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_20.holdoutRmse ? 'usable' : 'review'; }
