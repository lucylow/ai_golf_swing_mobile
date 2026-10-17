import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_03: CalibrationMetricKey = 'azimuthDeg';
export const ADAPTER_03 = { min: -45, max: 45, holdoutRmse: 2.0, kind: 'angle' as const };
export function normalize_03(value: number): number { return clampMetric(METRIC_03, value); }
export function isPlausible_03(value: number): boolean { return plausible(METRIC_03, value); }
export function percentOfRange_03(value: number): number { return (normalize_03(value) - ADAPTER_03.min) / Math.max(1e-9, ADAPTER_03.max - ADAPTER_03.min); }
export function denormalize_03(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_03.min + u * (ADAPTER_03.max - ADAPTER_03.min); }
export function qualityBand_03(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_03.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_03.holdoutRmse ? 'usable' : 'review'; }
