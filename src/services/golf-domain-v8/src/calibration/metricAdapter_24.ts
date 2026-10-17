import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_24: CalibrationMetricKey = 'smashFactor';
export const ADAPTER_24 = { min: 0.5, max: 1.7, holdoutRmse: 0.08, kind: 'ratio' as const };
export function normalize_24(value: number): number { return clampMetric(METRIC_24, value); }
export function isPlausible_24(value: number): boolean { return plausible(METRIC_24, value); }
export function percentOfRange_24(value: number): number { return (normalize_24(value) - ADAPTER_24.min) / Math.max(1e-9, ADAPTER_24.max - ADAPTER_24.min); }
export function denormalize_24(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_24.min + u * (ADAPTER_24.max - ADAPTER_24.min); }
export function qualityBand_24(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_24.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_24.holdoutRmse ? 'usable' : 'review'; }
