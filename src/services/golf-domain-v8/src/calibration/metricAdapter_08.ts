import { CalibrationMetricKey } from './types';
import { clampMetric, plausible } from './metricBounds';
export const METRIC_08: CalibrationMetricKey = 'clubSpeedMph';
export const ADAPTER_08 = { min: 20, max: 150, holdoutRmse: 5, kind: 'speed' as const };
export function normalize_08(value: number): number { return clampMetric(METRIC_08, value); }
export function isPlausible_08(value: number): boolean { return plausible(METRIC_08, value); }
export function percentOfRange_08(value: number): number { return (normalize_08(value) - ADAPTER_08.min) / Math.max(1e-9, ADAPTER_08.max - ADAPTER_08.min); }
export function denormalize_08(unitValue: number): number { const u = Math.max(0, Math.min(1, unitValue)); return ADAPTER_08.min + u * (ADAPTER_08.max - ADAPTER_08.min); }
export function qualityBand_08(rmseValue: number): 'strong' | 'usable' | 'review' { return rmseValue <= ADAPTER_08.holdoutRmse * 0.65 ? 'strong' : rmseValue <= ADAPTER_08.holdoutRmse ? 'usable' : 'review'; }
