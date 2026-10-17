import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_35: CalibrationMetricKey = 'spinAxisDeg';
export const ADAPTER_35 = { min: -60, max: 60, holdoutRmse: 3.0, kind: 'angle' as const };
export function normalize_35(value: number): number { return clampMetric(METRIC_35, value); }
export function isPlausible_35(value: number): boolean { return plausible(METRIC_35, value); }
export function percentOfRange_35(value: number): number { return (normalize_35(value) - ADAPTER_35.min) / Math.max(1e-9, ADAPTER_35.max - ADAPTER_35.min); }
export function denormalize_35(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_35.min + u * (ADAPTER_35.max - ADAPTER_35.min); }
export function qualityBand_35(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_35.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_35.holdoutRmse ? 'usable' : 'review'; }
