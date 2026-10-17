import { HoleModelV8, ClubStrategyProfile, StrategyCandidate, SimulationOptions, Vec2 } from './types';
import { getCaddieRecommendation } from './caddie';
export type HoleStrategy = { hole: number; recommendation: StrategyCandidate; alternatives: StrategyCandidate[] };
export function planRoundV8(holes: readonly HoleModelV8[], clubBag: readonly ClubStrategyProfile[], options: SimulationOptions): HoleStrategy[] {
  return holes.map((hole, index) => {
    const start = hole.tee;
    const rec = getCaddieRecommendation(hole, start, clubBag, { ...options, seed: options.seed + index * 1009 });
    return { hole: hole.hole, recommendation: rec.primary, alternatives: rec.alternatives };
  });
}
