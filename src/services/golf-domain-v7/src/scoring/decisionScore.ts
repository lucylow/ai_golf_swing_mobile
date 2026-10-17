import { clamp } from '../math/statistics';
export type DecisionScoreInput = { successProbability: number; penaltyProbability: number; recoveryQuality: number; distanceGain: number };
export type DecisionScore = { score: number; label: 'conservative' | 'balanced' | 'aggressive'; explanation: string };
export function scoreDecision(input: DecisionScoreInput): DecisionScore {
  const score = clamp(input.successProbability * 0.55 + input.recoveryQuality * 0.25 + input.distanceGain * 0.2 - input.penaltyProbability * 0.7, 0, 1);
  const label = score < 0.38 ? 'conservative' : score > 0.68 ? 'aggressive' : 'balanced';
  const explanation = label === 'aggressive' ? 'Higher expected gain outweighs added exposure in the modeled scenario.' : label === 'conservative' ? 'Preserving a playable next shot dominates the modeled value.' : 'The option balances progress with manageable downside.';
  return { score, label, explanation };
}

