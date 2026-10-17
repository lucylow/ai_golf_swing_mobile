import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_25: CalibrationMetricKey = 'clubPathDeg';
export const ADAPTER_25 = { min: -20, max: 20, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_25(value: number): number { return clampMetric(METRIC_25, value); }
export function isPlausible_25(value: number): boolean { return plausible(METRIC_25, value); }
export function percentOfRange_25(value: number): number { return (normalize_25(value) - ADAPTER_25.min) / Math.max(1e-9, ADAPTER_25.max - ADAPTER_25.min); }
export function denormalize_25(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_25.min + u * (ADAPTER_25.max - ADAPTER_25.min); }
export function qualityBand_25(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_25.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_25.holdoutRmse ? 'usable' : 'review'; }
