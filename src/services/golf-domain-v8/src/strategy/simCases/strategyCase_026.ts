import { HoleModelV8, ClubStrategyProfile, StrategyCandidate, Vec2 } from '../types';
import { distance, projectToRay } from '../geometry';
import { simulateCandidate } from '../monteCarlo';

export type StrategyCaseResult26 = {
  primary: StrategyCandidate | null;
  scoreDeltaToAggressive: number;
  penaltyRate: number;
  notes: string[];
};

const RISK_AVERSION = 0.61;
const WIND_MULTIPLIER = 1.600;

function targetForCase26(hole: HoleModelV8, start: Vec2, bias: number): Vec2 {
  const heading = Math.atan2(hole.green.pin.y - start.y, hole.green.pin.x - start.x) * 180 / Math.PI;
  return projectToRay(start, heading + bias, Math.max(40, hole.totalYards * 0.55));
}

function candidateForCase26(hole: HoleModelV8, club: ClubStrategyProfile, start: Vec2, bias: number): StrategyCandidate {
  const target = targetForCase26(hole, start, bias);
  return { id: `case-26-${club.clubId}-${bias}`, label: `${club.name} / ${bias >= 0 ? 'right' : 'left'}`, clubId: club.clubId, target, aimBiasYards: bias, expectedScore: 99, birdieProbability: 0, parProbability: 0, bogeyOrWorseProbability: 1, penaltyProbability: club.penaltyProbability * WIND_MULTIPLIER, recoveryProbability: 0.2, confidence: 0.68, rationale: ['Case-specific target bias.', 'Evaluated against course geometry and dispersion.'] };
}

export function runStrategyCase26(hole: HoleModelV8, start: Vec2, club: ClubStrategyProfile): StrategyCaseResult26 {
  const target = targetForCase26(hole, start, 0);
  const negative = targetForCase26(hole, start, -8);
  const positive = targetForCase26(hole, start, 8);
  const centerCandidate = candidateForCase26(hole, club, start, 0);
  const simCenter = simulateCandidate(hole, start, { club, target }, { iterations: 260, seed: 7026, riskAversion: RISK_AVERSION, targetPenaltyWeight: 1 });
  const simLeft = simulateCandidate(hole, start, { club, target: negative }, { iterations: 260, seed: 7126, riskAversion: RISK_AVERSION, targetPenaltyWeight: 1 });
  const simRight = simulateCandidate(hole, start, { club, target: positive }, { iterations: 260, seed: 7226, riskAversion: RISK_AVERSION, targetPenaltyWeight: 1 });
  const sims = [simCenter, simLeft, simRight];
  const bestIndex = sims.reduce((best, current, index, all) => current.mean < all[best].mean ? index : best, 0);
  const primary = bestIndex === 0 ? centerCandidate : candidateForCase26(hole, club, start, bestIndex === 1 ? -8 : 8);
  const bestMean = sims[bestIndex].mean;
  const aggressiveMean = Math.min(simLeft.mean, simRight.mean);
  return { primary: { ...primary, expectedScore: bestMean, parProbability: sims[bestIndex].parProbability, bogeyOrWorseProbability: sims[bestIndex].bogeyOrWorseProbability, penaltyProbability: sims[bestIndex].penaltyProbability, recoveryProbability: sims[bestIndex].recoveryProbability }, scoreDeltaToAggressive: aggressiveMean - bestMean, penaltyRate: sims[bestIndex].penaltyProbability, notes: [distance(target, hole.green.pin).toFixed(1) + ' yd to pin target proxy.', 'Risk aversion=' + RISK_AVERSION.toFixed(2)] };
}
