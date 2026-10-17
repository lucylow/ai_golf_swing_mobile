import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_05: CalibrationMetricKey = 'spinAxisDeg';
export const ADAPTER_05 = { min: -60, max: 60, holdoutRmse: 3.0, kind: 'angle' as const };
export function normalize_05(value: number): number { return clampMetric(METRIC_05, value); }
export function isPlausible_05(value: number): boolean { return plausible(METRIC_05, value); }
export function percentOfRange_05(value: number): number { return (normalize_05(value) - ADAPTER_05.min) / Math.max(1e-9, ADAPTER_05.max - ADAPTER_05.min); }
export function denormalize_05(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_05.min + u * (ADAPTER_05.max - ADAPTER_05.min); }
export function qualityBand_05(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_05.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_05.holdoutRmse ? 'usable' : 'review'; }
