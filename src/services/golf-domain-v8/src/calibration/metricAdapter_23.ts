import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_23: CalibrationMetricKey = 'clubSpeedMph';
export const ADAPTER_23 = { min: 20, max: 150, holdoutRmse: 5, kind: 'speed' as const };
export function normalize_23(value: number): number { return clampMetric(METRIC_23, value); }
export function isPlausible_23(value: number): boolean { return plausible(METRIC_23, value); }
export function percentOfRange_23(value: number): number { return (normalize_23(value) - ADAPTER_23.min) / Math.max(1e-9, ADAPTER_23.max - ADAPTER_23.min); }
export function denormalize_23(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_23.min + u * (ADAPTER_23.max - ADAPTER_23.min); }
export function qualityBand_23(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_23.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_23.holdoutRmse ? 'usable' : 'review'; }
