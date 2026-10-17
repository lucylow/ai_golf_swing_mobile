import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_38: CalibrationMetricKey = 'clubSpeedMph';
export const ADAPTER_38 = { min: 20, max: 150, holdoutRmse: 5, kind: 'speed' as const };
export function normalize_38(value: number): number { return clampMetric(METRIC_38, value); }
export function isPlausible_38(value: number): boolean { return plausible(METRIC_38, value); }
export function percentOfRange_38(value: number): number { return (normalize_38(value) - ADAPTER_38.min) / Math.max(1e-9, ADAPTER_38.max - ADAPTER_38.min); }
export function denormalize_38(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_38.min + u * (ADAPTER_38.max - ADAPTER_38.min); }
export function qualityBand_38(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_38.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_38.holdoutRmse ? 'usable' : 'review'; }
