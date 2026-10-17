import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_10: CalibrationMetricKey = 'clubPathDeg';
export const ADAPTER_10 = { min: -20, max: 20, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_10(value: number): number { return clampMetric(METRIC_10, value); }
export function isPlausible_10(value: number): boolean { return plausible(METRIC_10, value); }
export function percentOfRange_10(value: number): number { return (normalize_10(value) - ADAPTER_10.min) / Math.max(1e-9, ADAPTER_10.max - ADAPTER_10.min); }
export function denormalize_10(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_10.min + u * (ADAPTER_10.max - ADAPTER_10.min); }
export function qualityBand_10(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_10.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_10.holdoutRmse ? 'usable' : 'review'; }
