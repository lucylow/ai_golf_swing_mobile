import { StrategyCandidate } from './types';
export type RiskBudget = { maxPenalty: number; maxBogeyOrWorse: number; preference: 'safe' | 'balanced' | 'aggressive' };
export function filterByRiskBudget(candidates: readonly StrategyCandidate[], budget: RiskBudget): StrategyCandidate[] {
  return candidates.filter((c) => c.penaltyProbability <= budget.maxPenalty && c.bogeyOrWorseProbability <= budget.maxBogeyOrWorse).sort((a, b) => a.expectedScore - b.expectedScore);
}
export function riskNarrative(c: StrategyCandidate): string { return `${c.label}: ${(c.penaltyProbability * 100).toFixed(1)}% penalty probability, ${(c.bogeyOrWorseProbability * 100).toFixed(1)}% bogey-or-worse.`; }
