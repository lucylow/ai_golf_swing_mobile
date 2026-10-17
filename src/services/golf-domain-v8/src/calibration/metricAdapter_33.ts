import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_33: CalibrationMetricKey = 'azimuthDeg';
export const ADAPTER_33 = { min: -45, max: 45, holdoutRmse: 2.0, kind: 'angle' as const };
export function normalize_33(value: number): number { return clampMetric(METRIC_33, value); }
export function isPlausible_33(value: number): boolean { return plausible(METRIC_33, value); }
export function percentOfRange_33(value: number): number { return (normalize_33(value) - ADAPTER_33.min) / Math.max(1e-9, ADAPTER_33.max - ADAPTER_33.min); }
export function denormalize_33(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_33.min + u * (ADAPTER_33.max - ADAPTER_33.min); }
export function qualityBand_33(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_33.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_33.holdoutRmse ? 'usable' : 'review'; }
