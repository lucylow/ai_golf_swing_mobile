import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_22: CalibrationMetricKey = 'totalYards';
export const ADAPTER_22 = { min: 5, max: 450, holdoutRmse: 12, kind: 'distance' as const };
export function normalize_22(value: number): number { return clampMetric(METRIC_22, value); }
export function isPlausible_22(value: number): boolean { return plausible(METRIC_22, value); }
export function percentOfRange_22(value: number): number { return (normalize_22(value) - ADAPTER_22.min) / Math.max(1e-9, ADAPTER_22.max - ADAPTER_22.min); }
export function denormalize_22(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_22.min + u * (ADAPTER_22.max - ADAPTER_22.min); }
export function qualityBand_22(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_22.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_22.holdoutRmse ? 'usable' : 'review'; }
