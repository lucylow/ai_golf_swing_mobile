import { CalibrationSample } from './types';

export type ShotPair = {
  shotKey: string;
  clubId?: string;
  app: Record<string, number>;
  reference: Record<string, number>;
  timestampMs?: number;
};

export function groupCalibrationSamples(samples: readonly CalibrationSample[]): ShotPair[] {
  const map = new Map<string, ShotPair>();
  for (const s of samples) {
    if (!Number.isFinite(s.appValue) || !Number.isFinite(s.referenceValue)) continue;
    const current = map.get(s.shotKey) ?? { shotKey: s.shotKey, clubId: s.clubId, app: {}, reference: {}, timestampMs: s.timestampMs };
    current.app[s.metric] = s.appValue;
    current.reference[s.metric] = s.referenceValue;
    map.set(s.shotKey, current);
  }
  return [...map.values()].sort((a, b) => (a.timestampMs ?? 0) - (b.timestampMs ?? 0));
}
