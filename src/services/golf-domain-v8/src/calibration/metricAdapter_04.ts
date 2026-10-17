import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_04: CalibrationMetricKey = 'spinRpm';
export const ADAPTER_04 = { min: 100, max: 12000, holdoutRmse: 350, kind: 'spin' as const };
export function normalize_04(value: number): number { return clampMetric(METRIC_04, value); }
export function isPlausible_04(value: number): boolean { return plausible(METRIC_04, value); }
export function percentOfRange_04(value: number): number { return (normalize_04(value) - ADAPTER_04.min) / Math.max(1e-9, ADAPTER_04.max - ADAPTER_04.min); }
export function denormalize_04(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_04.min + u * (ADAPTER_04.max - ADAPTER_04.min); }
export function qualityBand_04(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_04.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_04.holdoutRmse ? 'usable' : 'review'; }
