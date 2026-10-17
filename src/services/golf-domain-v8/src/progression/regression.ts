import { MasteryStateV8 } from './types';
export type RegressionPlan = { reduceDifficultyBy: number; reduceRepsBy: number; simplifyContext: boolean; reason: string };
export function buildRegressionPlan(state: MasteryStateV8): RegressionPlan {
  if (!state.needsRegression) return { reduceDifficultyBy: 0, reduceRepsBy: 0, simplifyContext: false, reason: 'No regression needed.' };
  const severity = Math.max(0, Math.min(1, 1 - state.recentScore + state.recentVariance));
  return { reduceDifficultyBy: 0.08 + severity * 0.12, reduceRepsBy: Math.round(2 + severity * 5), simplifyContext: severity > 0.55, reason: 'Recent evidence indicates the current variation is exceeding reliable control.' };
}
