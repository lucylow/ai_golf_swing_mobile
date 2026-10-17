import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_37: CalibrationMetricKey = 'totalYards';
export const ADAPTER_37 = { min: 5, max: 450, holdoutRmse: 12, kind: 'distance' as const };
export function normalize_37(value: number): number { return clampMetric(METRIC_37, value); }
export function isPlausible_37(value: number): boolean { return plausible(METRIC_37, value); }
export function percentOfRange_37(value: number): number { return (normalize_37(value) - ADAPTER_37.min) / Math.max(1e-9, ADAPTER_37.max - ADAPTER_37.min); }
export function denormalize_37(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_37.min + u * (ADAPTER_37.max - ADAPTER_37.min); }
export function qualityBand_37(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_37.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_37.holdoutRmse ? 'usable' : 'review'; }
