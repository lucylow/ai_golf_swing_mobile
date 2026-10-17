import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_32: CalibrationMetricKey = 'launchAngleDeg';
export const ADAPTER_32 = { min: -10, max: 45, holdoutRmse: 1.8, kind: 'angle' as const };
export function normalize_32(value: number): number { return clampMetric(METRIC_32, value); }
export function isPlausible_32(value: number): boolean { return plausible(METRIC_32, value); }
export function percentOfRange_32(value: number): number { return (normalize_32(value) - ADAPTER_32.min) / Math.max(1e-9, ADAPTER_32.max - ADAPTER_32.min); }
export function denormalize_32(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_32.min + u * (ADAPTER_32.max - ADAPTER_32.min); }
export function qualityBand_32(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_32.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_32.holdoutRmse ? 'usable' : 'review'; }
