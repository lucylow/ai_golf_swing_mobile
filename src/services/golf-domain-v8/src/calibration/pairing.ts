import { CalibrationSample } from './types';

export type RawShotMeasurement = {
  shotKey: string;
  metrics: Partial<Record<CalibrationSample['metric'], number>>;
  clubId?: string;
  timestampMs?: number;
};

export function pairMeasurements(app: readonly RawShotMeasurement[], reference: readonly RawShotMeasurement[]): CalibrationSample[] {
  const refMap = new Map(reference.map((r) => [r.shotKey, r]));
  const out: CalibrationSample[] = [];
  for (const a of app) {
    const r = refMap.get(a.shotKey);
    if (!r) continue;
    for (const metric of Object.keys(a.metrics) as CalibrationSample['metric'][]) {
      const av = a.metrics[metric];
      const rv = r.metrics[metric];
      if (av == null || rv == null) continue;
      out.push({ shotKey: a.shotKey, metric, appValue: av, referenceValue: rv, clubId: a.clubId, timestampMs: a.timestampMs });
    }
  }
  return out;
}
