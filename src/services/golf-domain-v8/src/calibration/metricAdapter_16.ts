import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_16: CalibrationMetricKey = 'ballSpeedMph';
export const ADAPTER_16 = { min: 10, max: 210, holdoutRmse: 5, kind: 'speed' as const };
export function normalize_16(value: number): number { return clampMetric(METRIC_16, value); }
export function isPlausible_16(value: number): boolean { return plausible(METRIC_16, value); }
export function percentOfRange_16(value: number): number { return (normalize_16(value) - ADAPTER_16.min) / Math.max(1e-9, ADAPTER_16.max - ADAPTER_16.min); }
export function denormalize_16(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_16.min + u * (ADAPTER_16.max - ADAPTER_16.min); }
export function qualityBand_16(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_16.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_16.holdoutRmse ? 'usable' : 'review'; }
