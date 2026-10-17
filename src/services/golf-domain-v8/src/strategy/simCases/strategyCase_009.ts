import { HoleModelV8, ClubStrategyProfile, StrategyCandidate, Vec2 } from '../types';
import { distance, projectToRay } from '../geometry';
import { simulateCandidate } from '../monteCarlo';

export type StrategyCaseResult9 = {
  primary: StrategyCandidate | null;
  scoreDeltaToAggressive: number;
  penaltyRate: number;
  notes: string[];
};

const RISK_AVERSION = 0.79;
const WIND_MULTIPLIER = 1.300;

function targetForCase9(hole: HoleModelV8, start: Vec2, bias: number): Vec2 {
  const heading = Math.atan2(hole.green.pin.y - start.y, hole.green.pin.x - start.x) * 180 / Math.PI;
  return projectToRay(start, heading + bias, Math.max(40, hole.totalYards * 0.55));
}

function candidateForCase9(hole: HoleModelV8, club: ClubStrategyProfile, start: Vec2, bias: number): StrategyCandidate {
  const target = targetForCase9(hole, start, bias);
  return { id: `case-9-${club.clubId}-${bias}`, label: `${club.name} / ${bias >= 0 ? 'right' : 'left'}`, clubId: club.clubId, target, aimBiasYards: bias, expectedScore: 99, birdieProbability: 0, parProbability: 0, bogeyOrWorseProbability: 1, penaltyProbability: club.penaltyProbability * WIND_MULTIPLIER, recoveryProbability: 0.2, confidence: 0.68, rationale: ['Case-specific target bias.', 'Evaluated against course geometry and dispersion.'] };
}

export function runStrategyCase9(hole: HoleModelV8, start: Vec2, club: ClubStrategyProfile): StrategyCaseResult9 {
  const target = targetForCase9(hole, start, 0);
  const negative = targetForCase9(hole, start, -8);
  const positive = targetForCase9(hole, start, 8);
  const centerCandidate = candidateForCase9(hole, club, start, 0);
  const simCenter = simulateCandidate(hole, start, { club, target }, { iterations: 260, seed: 7009, riskAversion: RISK_AVERSION, targetPenaltyWeight: 1 });
  const simLeft = simulateCandidate(hole, start, { club, target: negative }, { iterations: 260, seed: 7109, riskAversion: RISK_AVERSION, targetPenaltyWeight: 1 });
  const simRight = simulateCandidate(hole, start, { club, target: positive }, { iterations: 260, seed: 7209, riskAversion: RISK_AVERSION, targetPenaltyWeight: 1 });
  const sims = [simCenter, simLeft, simRight];
  const bestIndex = sims.reduce((best, current, index, all) => current.mean < all[best].mean ? index : best, 0);
  const primary = bestIndex === 0 ? centerCandidate : candidateForCase9(hole, club, start, bestIndex === 1 ? -8 : 8);
  const bestMean = sims[bestIndex].mean;
  const aggressiveMean = Math.min(simLeft.mean, simRight.mean);
  return { primary: { ...primary, expectedScore: bestMean, parProbability: sims[bestIndex].parProbability, bogeyOrWorseProbability: sims[bestIndex].bogeyOrWorseProbability, penaltyProbability: sims[bestIndex].penaltyProbability, recoveryProbability: sims[bestIndex].recoveryProbability }, scoreDeltaToAggressive: aggressiveMean - bestMean, penaltyRate: sims[bestIndex].penaltyProbability, notes: [distance(target, hole.green.pin).toFixed(1) + ' yd to pin target proxy.', 'Risk aversion=' + RISK_AVERSION.toFixed(2)] };
}
