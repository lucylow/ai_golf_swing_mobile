import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_40: CalibrationMetricKey = 'clubPathDeg';
export const ADAPTER_40 = { min: -20, max: 20, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_40(value: number): number { return clampMetric(METRIC_40, value); }
export function isPlausible_40(value: number): boolean { return plausible(METRIC_40, value); }
export function percentOfRange_40(value: number): number { return (normalize_40(value) - ADAPTER_40.min) / Math.max(1e-9, ADAPTER_40.max - ADAPTER_40.min); }
export function denormalize_40(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_40.min + u * (ADAPTER_40.max - ADAPTER_40.min); }
export function qualityBand_40(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_40.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_40.holdoutRmse ? 'usable' : 'review'; }
