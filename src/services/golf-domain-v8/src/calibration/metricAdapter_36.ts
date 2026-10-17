import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_36: CalibrationMetricKey = 'carryYards';
export const ADAPTER_36 = { min: 5, max: 400, holdoutRmse: 8, kind: 'distance' as const };
export function normalize_36(value: number): number { return clampMetric(METRIC_36, value); }
export function isPlausible_36(value: number): boolean { return plausible(METRIC_36, value); }
export function percentOfRange_36(value: number): number { return (normalize_36(value) - ADAPTER_36.min) / Math.max(1e-9, ADAPTER_36.max - ADAPTER_36.min); }
export function denormalize_36(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_36.min + u * (ADAPTER_36.max - ADAPTER_36.min); }
export function qualityBand_36(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_36.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_36.holdoutRmse ? 'usable' : 'review'; }
