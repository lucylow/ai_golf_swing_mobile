import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_34: CalibrationMetricKey = 'spinRpm';
export const ADAPTER_34 = { min: 100, max: 12000, holdoutRmse: 350, kind: 'spin' as const };
export function normalize_34(value: number): number { return clampMetric(METRIC_34, value); }
export function isPlausible_34(value: number): boolean { return plausible(METRIC_34, value); }
export function percentOfRange_34(value: number): number { return (normalize_34(value) - ADAPTER_34.min) / Math.max(1e-9, ADAPTER_34.max - ADAPTER_34.min); }
export function denormalize_34(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_34.min + u * (ADAPTER_34.max - ADAPTER_34.min); }
export function qualityBand_34(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_34.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_34.holdoutRmse ? 'usable' : 'review'; }
