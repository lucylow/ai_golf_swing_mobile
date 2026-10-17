import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_27: CalibrationMetricKey = 'faceAngleDeg';
export const ADAPTER_27 = { min: -20, max: 20, holdoutRmse: 1.5, kind: 'angle' as const };
export function normalize_27(value: number): number { return clampMetric(METRIC_27, value); }
export function isPlausible_27(value: number): boolean { return plausible(METRIC_27, value); }
export function percentOfRange_27(value: number): number { return (normalize_27(value) - ADAPTER_27.min) / Math.max(1e-9, ADAPTER_27.max - ADAPTER_27.min); }
export function denormalize_27(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_27.min + u * (ADAPTER_27.max - ADAPTER_27.min); }
export function qualityBand_27(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_27.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_27.holdoutRmse ? 'usable' : 'review'; }
