import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_12: CalibrationMetricKey = 'faceAngleDeg';
export const ADAPTER_12 = { min: -20, max: 20, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_12(value: number): number { return clampMetric(METRIC_12, value); }
export function isPlausible_12(value: number): boolean { return plausible(METRIC_12, value); }
export function percentOfRange_12(value: number): number { return (normalize_12(value) - ADAPTER_12.min) / Math.max(1e-9, ADAPTER_12.max - ADAPTER_12.min); }
export function denormalize_12(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_12.min + u * (ADAPTER_12.max - ADAPTER_12.min); }
export function qualityBand_12(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_12.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_12.holdoutRmse ? 'usable' : 'review'; }
