import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_15: CalibrationMetricKey = 'closureRateDegPerSec';
export const ADAPTER_15 = { min: 0, max: 3000, holdoutRmse: 120, kind: 'speed' as const };
export function normalize_15(value: number): number { return clampMetric(METRIC_15, value); }
export function isPlausible_15(value: number): boolean { return plausible(METRIC_15, value); }
export function percentOfRange_15(value: number): number { return (normalize_15(value) - ADAPTER_15.min) / Math.max(1e-9, ADAPTER_15.max - ADAPTER_15.min); }
export function denormalize_15(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_15.min + u * (ADAPTER_15.max - ADAPTER_15.min); }
export function qualityBand_15(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_15.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_15.holdoutRmse ? 'usable' : 'review'; }
