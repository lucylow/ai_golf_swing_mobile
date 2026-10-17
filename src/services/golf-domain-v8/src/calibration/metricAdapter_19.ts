import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_19: CalibrationMetricKey = 'spinRpm';
export const ADAPTER_19 = { min: 100, max: 12000, holdoutRmse: 350, kind: 'spin' as const };
export function normalize_19(value: number): number { return clampMetric(METRIC_19, value); }
export function isPlausible_19(value: number): boolean { return plausible(METRIC_19, value); }
export function percentOfRange_19(value: number): number { return (normalize_19(value) - ADAPTER_19.min) / Math.max(1e-9, ADAPTER_19.max - ADAPTER_19.min); }
export function denormalize_19(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_19.min + u * (ADAPTER_19.max - ADAPTER_19.min); }
export function qualityBand_19(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_19.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_19.holdoutRmse ? 'usable' : 'review'; }
