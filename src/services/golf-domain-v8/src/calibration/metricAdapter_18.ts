import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_18: CalibrationMetricKey = 'azimuthDeg';
export const ADAPTER_18 = { min: -45, max: 45, holdoutRmse: 2.0, kind: 'angle' as const };
export function normalize_18(value: number): number { return clampMetric(METRIC_18, value); }
export function isPlausible_18(value: number): boolean { return plausible(METRIC_18, value); }
export function percentOfRange_18(value: number): number { return (normalize_18(value) - ADAPTER_18.min) / Math.max(1e-9, ADAPTER_18.max - ADAPTER_18.min); }
export function denormalize_18(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_18.min + u * (ADAPTER_18.max - ADAPTER_18.min); }
export function qualityBand_18(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_18.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_18.holdoutRmse ? 'usable' : 'review'; }
