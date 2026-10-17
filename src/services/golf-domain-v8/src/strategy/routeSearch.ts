import { HoleModelV8, ClubStrategyProfile, StrategyCandidate, Vec2 } from './types';
import { getCaddieRecommendation } from './caddie';
export type RouteNode = { id: string; position: Vec2; cumulativeValue: number; path: string[] };
export function searchTwoShotRoute(hole: HoleModelV8, start: Vec2, clubs: readonly ClubStrategyProfile[], seed: number): RouteNode[] {
  const first = getCaddieRecommendation(hole, start, clubs, { iterations: 220, seed, riskAversion: 0.55, targetPenaltyWeight: 1 });
  const nodes: RouteNode[] = first.alternatives.concat(first.primary).map((choice) => ({ id: choice.id, position: choice.target, cumulativeValue: choice.expectedScore, path: [choice.label] }));
  return nodes.sort((a, b) => a.cumulativeValue - b.cumulativeValue).slice(0, 5);
}
export function routeHeadline(nodes: readonly RouteNode[]): string { return nodes.length ? `Top route: ${nodes[0].path.join(' → ')}` : 'No viable route.'; }
