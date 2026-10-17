import { CalibrationSample } from './types';
export function temporalHoldout<T extends { timestampMs?: number }>(samples: readonly T[], fraction: number): { train: T[]; test: T[] } {
  const xs = samples.slice().sort((a, b) => (a.timestampMs ?? 0) - (b.timestampMs ?? 0));
  const n = Math.max(1, Math.min(xs.length - 1, Math.floor(xs.length * fraction)));
  return { train: xs.slice(0, xs.length - n), test: xs.slice(xs.length - n) };
}
export function groupByShot(samples: readonly CalibrationSample[]): Map<string, CalibrationSample[]> {
  const map = new Map<string, CalibrationSample[]>();
  for (const sample of samples) map.set(sample.shotKey, [...(map.get(sample.shotKey) ?? []), sample]);
  return map;
}
