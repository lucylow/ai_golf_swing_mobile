import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_26: CalibrationMetricKey = 'attackAngleDeg';
export const ADAPTER_26 = { min: -15, max: 15, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_26(value: number): number { return clampMetric(METRIC_26, value); }
export function isPlausible_26(value: number): boolean { return plausible(METRIC_26, value); }
export function percentOfRange_26(value: number): number { return (normalize_26(value) - ADAPTER_26.min) / Math.max(1e-9, ADAPTER_26.max - ADAPTER_26.min); }
export function denormalize_26(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_26.min + u * (ADAPTER_26.max - ADAPTER_26.min); }
export function qualityBand_26(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_26.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_26.holdoutRmse ? 'usable' : 'review'; }
