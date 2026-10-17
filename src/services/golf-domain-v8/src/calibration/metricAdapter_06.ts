import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_06: CalibrationMetricKey = 'carryYards';
export const ADAPTER_06 = { min: 5, max: 400, holdoutRmse: 8, kind: 'distance' as const };
export function normalize_06(value: number): number { return clampMetric(METRIC_06, value); }
export function isPlausible_06(value: number): boolean { return plausible(METRIC_06, value); }
export function percentOfRange_06(value: number): number { return (normalize_06(value) - ADAPTER_06.min) / Math.max(1e-9, ADAPTER_06.max - ADAPTER_06.min); }
export function denormalize_06(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_06.min + u * (ADAPTER_06.max - ADAPTER_06.min); }
export function qualityBand_06(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_06.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_06.holdoutRmse ? 'usable' : 'review'; }
