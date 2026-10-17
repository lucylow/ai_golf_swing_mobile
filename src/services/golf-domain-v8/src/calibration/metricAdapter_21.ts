import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_21: CalibrationMetricKey = 'carryYards';
export const ADAPTER_21 = { min: 5, max: 400, holdoutRmse: 8, kind: 'distance' as const };
export function normalize_21(value: number): number { return clampMetric(METRIC_21, value); }
export function isPlausible_21(value: number): boolean { return plausible(METRIC_21, value); }
export function percentOfRange_21(value: number): number { return (normalize_21(value) - ADAPTER_21.min) / Math.max(1e-9, ADAPTER_21.max - ADAPTER_21.min); }
export function denormalize_21(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_21.min + u * (ADAPTER_21.max - ADAPTER_21.min); }
export function qualityBand_21(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_21.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_21.holdoutRmse ? 'usable' : 'review'; }
