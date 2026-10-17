import { LieV8, Vec2 } from './types';
import { distance } from './geometry';
export type StateValueTable = Partial<Record<LieV8, number>>;
export const DEFAULT_STATE_VALUES: StateValueTable = { tee: 0.99, fairway: 1.0, 'first-cut': 1.08, rough: 1.22, 'deep-rough': 1.52, recovery: 1.75, sand: 1.68, green: 1.55, hazard: 2.15, ob: 2.25 };
export function expectedStrokesToFinish(distanceYards: number, lie: LieV8): number {
  const base = distanceYards <= 30 ? 1.9 : distanceYards <= 80 ? 2.8 : distanceYards <= 150 ? 3.5 : distanceYards <= 220 ? 4.1 : distanceYards <= 320 ? 4.8 : 5.4;
  return base + (DEFAULT_STATE_VALUES[lie] ?? 1.2) - 1;
}
export function greenHitProbability(distanceYards: number, lateralMissStd: number, greenRadiusYards = 25): number {
  const distancePenalty = Math.max(0, (distanceYards - 80) / 260);
  const spreadPenalty = Math.min(0.7, lateralMissStd / Math.max(1, greenRadiusYards) * 0.5);
  return Math.max(0.03, Math.min(0.92, 0.88 - distancePenalty - spreadPenalty));
}
export function routeValue(distance: number, lie: LieV8, penaltyProbability: number, recoveryProbability: number): number {
  return expectedStrokesToFinish(distance, lie) + penaltyProbability * 1.9 + recoveryProbability * 0.8;
}
export function nearestHazardDistance(point: Vec2, hazards: HoleModelHazardLike[]): number {
  if (!hazards.length) return Infinity;
  return Math.min(...hazards.map((h) => distance(point, h.center)));
}
export type HoleModelHazardLike = { center: Vec2 };
