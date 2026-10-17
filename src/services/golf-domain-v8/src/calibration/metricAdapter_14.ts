import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_14: CalibrationMetricKey = 'impactOffsetMm';
export const ADAPTER_14 = { min: -30, max: 30, holdoutRmse: 4, kind: 'distance' as const };
export function normalize_14(value: number): number { return clampMetric(METRIC_14, value); }
export function isPlausible_14(value: number): boolean { return plausible(METRIC_14, value); }
export function percentOfRange_14(value: number): number { return (normalize_14(value) - ADAPTER_14.min) / Math.max(1e-9, ADAPTER_14.max - ADAPTER_14.min); }
export function denormalize_14(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_14.min + u * (ADAPTER_14.max - ADAPTER_14.min); }
export function qualityBand_14(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_14.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_14.holdoutRmse ? 'usable' : 'review'; }
