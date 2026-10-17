import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_31: CalibrationMetricKey = 'ballSpeedMph';
export const ADAPTER_31 = { min: 10, max: 210, holdoutRmse: 5, kind: 'speed' as const };
export function normalize_31(value: number): number { return clampMetric(METRIC_31, value); }
export function isPlausible_31(value: number): boolean { return plausible(METRIC_31, value); }
export function percentOfRange_31(value: number): number { return (normalize_31(value) - ADAPTER_31.min) / Math.max(1e-9, ADAPTER_31.max - ADAPTER_31.min); }
export function denormalize_31(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_31.min + u * (ADAPTER_31.max - ADAPTER_31.min); }
export function qualityBand_31(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_31.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_31.holdoutRmse ? 'usable' : 'review'; }
