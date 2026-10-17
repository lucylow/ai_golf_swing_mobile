import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_01: CalibrationMetricKey = 'ballSpeedMph';
export const ADAPTER_01 = { min: 10, max: 210, holdoutRmse: 5, kind: 'speed' as const };
export function normalize_01(value: number): number { return clampMetric(METRIC_01, value); }
export function isPlausible_01(value: number): boolean { return plausible(METRIC_01, value); }
export function percentOfRange_01(value: number): number { return (normalize_01(value) - ADAPTER_01.min) / Math.max(1e-9, ADAPTER_01.max - ADAPTER_01.min); }
export function denormalize_01(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_01.min + u * (ADAPTER_01.max - ADAPTER_01.min); }
export function qualityBand_01(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_01.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_01.holdoutRmse ? 'usable' : 'review'; }
