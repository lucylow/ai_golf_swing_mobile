import { CalibrationMetricKey, CalibrationProfileV8 } from './types';

export function calibrateValue(profile: CalibrationProfileV8 | null, metric: CalibrationMetricKey, raw: number): number {
  if (!profile) return raw;
  const c = profile.coefficients[metric];
  if (!c || !Number.isFinite(raw)) return raw;
  return c.intercept + c.scale * raw;
}

export function calibrateMetrics(profile: CalibrationProfileV8 | null, metrics: Partial<Record<CalibrationMetricKey, number>>): Partial<Record<CalibrationMetricKey, number>> {
  const out: Partial<Record<CalibrationMetricKey, number>> = {};
  for (const [key, value] of Object.entries(metrics) as [CalibrationMetricKey, number | undefined][]) {
    if (value != null) out[key] = calibrateValue(profile, key, value);
  }
  return out;
}
