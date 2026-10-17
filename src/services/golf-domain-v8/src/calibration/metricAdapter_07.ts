import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_07: CalibrationMetricKey = 'totalYards';
export const ADAPTER_07 = { min: 5, max: 450, holdoutRmse: 12, kind: 'distance' as const };
export function normalize_07(value: number): number { return clampMetric(METRIC_07, value); }
export function isPlausible_07(value: number): boolean { return plausible(METRIC_07, value); }
export function percentOfRange_07(value: number): number { return (normalize_07(value) - ADAPTER_07.min) / Math.max(1e-9, ADAPTER_07.max - ADAPTER_07.min); }
export function denormalize_07(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_07.min + u * (ADAPTER_07.max - ADAPTER_07.min); }
export function qualityBand_07(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_07.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_07.holdoutRmse ? 'usable' : 'review'; }
