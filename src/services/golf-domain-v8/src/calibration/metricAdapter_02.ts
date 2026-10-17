import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_02: CalibrationMetricKey = 'launchAngleDeg';
export const ADAPTER_02 = { min: -10, max: 45, holdoutRmse: 1.8, kind: 'angle' as const };
export function normalize_02(value: number): number { return clampMetric(METRIC_02, value); }
export function isPlausible_02(value: number): boolean { return plausible(METRIC_02, value); }
export function percentOfRange_02(value: number): number { return (normalize_02(value) - ADAPTER_02.min) / Math.max(1e-9, ADAPTER_02.max - ADAPTER_02.min); }
export function denormalize_02(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_02.min + u * (ADAPTER_02.max - ADAPTER_02.min); }
export function qualityBand_02(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_02.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_02.holdoutRmse ? 'usable' : 'review'; }
