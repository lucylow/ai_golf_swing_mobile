import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_29: CalibrationMetricKey = 'impactOffsetMm';
export const ADAPTER_29 = { min: -30, max: 30, holdoutRmse: 4, kind: 'distance' as const };
export function normalize_29(value: number): number { return clampMetric(METRIC_29, value); }
export function isPlausible_29(value: number): boolean { return plausible(METRIC_29, value); }
export function percentOfRange_29(value: number): number { return (normalize_29(value) - ADAPTER_29.min) / Math.max(1e-9, ADAPTER_29.max - ADAPTER_29.min); }
export function denormalize_29(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_29.min + u * (ADAPTER_29.max - ADAPTER_29.min); }
export function qualityBand_29(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_29.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_29.holdoutRmse ? 'usable' : 'review'; }
