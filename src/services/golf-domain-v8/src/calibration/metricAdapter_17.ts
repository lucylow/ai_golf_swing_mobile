import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_17: CalibrationMetricKey = 'launchAngleDeg';
export const ADAPTER_17 = { min: -10, max: 45, holdoutRmse: 1.8, kind: 'angle' as const };
export function normalize_17(value: number): number { return clampMetric(METRIC_17, value); }
export function isPlausible_17(value: number): boolean { return plausible(METRIC_17, value); }
export function percentOfRange_17(value: number): number { return (normalize_17(value) - ADAPTER_17.min) / Math.max(1e-9, ADAPTER_17.max - ADAPTER_17.min); }
export function denormalize_17(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_17.min + u * (ADAPTER_17.max - ADAPTER_17.min); }
export function qualityBand_17(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_17.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_17.holdoutRmse ? 'usable' : 'review'; }
