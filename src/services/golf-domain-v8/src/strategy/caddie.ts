import { HoleModelV8, ClubStrategyProfile, StrategyCandidate, SimulationOptions, Vec2 } from './types';
import { simulateHolePlans } from './planBuilder';
export type CaddieRecommendationV8 = { primary: StrategyCandidate; alternatives: StrategyCandidate[]; message: string; assumptions: string[] };
export function getCaddieRecommendation(hole: HoleModelV8, start: Vec2, clubs: readonly ClubStrategyProfile[], options: SimulationOptions): CaddieRecommendationV8 {
  const ranked = simulateHolePlans(hole, start, clubs, options);
  const primary = ranked[0] ?? { id: 'none', label: 'No candidate', clubId: '', target: hole.green.pin, aimBiasYards: 0, expectedScore: hole.par + 1, birdieProbability: 0, parProbability: 0, bogeyOrWorseProbability: 1, penaltyProbability: 1, recoveryProbability: 1, confidence: 0.2, rationale: ['Insufficient simulation data.'] };
  return { primary, alternatives: ranked.slice(1), message: `${primary.label}: projected ${primary.expectedScore.toFixed(2)} strokes from this decision point.`, assumptions: ['Wind is treated as deterministic for the hole.', 'Dispersion is represented by a bivariate normal approximation.', 'Hazard geometry controls penalty states.'] };
}
