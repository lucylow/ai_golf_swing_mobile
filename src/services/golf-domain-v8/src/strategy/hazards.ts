import { HazardV8, HoleModelV8, LieV8, Vec2 } from './types';
import { polygonContains } from './geometry';
export type HazardHit = { hazard?: HazardV8; lie: LieV8; penalty: number; recoveryPenalty: number };
export function classifyLanding(hole: HoleModelV8, point: Vec2): HazardHit {
  for (const hazard of hole.hazards) if (polygonContains(point, hazard.polygon)) return { hazard, lie: hazard.kind === 'water' ? 'hazard' : hazard.kind === 'ob' ? 'ob' : 'recovery', penalty: hazard.penaltyStrokes, recoveryPenalty: hazard.recoveryPenalty };
  for (const fairway of hole.fairway) if (polygonContains(point, fairway)) return { lie: fairway.lie, penalty: 0, recoveryPenalty: fairway.lie === 'deep-rough' ? 0.55 : fairway.lie === 'rough' ? 0.28 : 0 };
  const d = Math.hypot(point.x - hole.green.center.x, point.y - hole.green.center.y);
  if (d <= hole.green.radiusYards) return { lie: 'green', penalty: 0, recoveryPenalty: 0 };
  return { lie: 'rough', penalty: 0, recoveryPenalty: 0.4 };
}
export function hazardRiskFraction(points: readonly { finalPosition: Vec2; penalty: boolean }[], hazardId: string): number {
  if (!points.length) return 0;
  return points.filter((p) => p.penalty && p.finalPosition && hazardId.length > 0).length / points.length;
}
