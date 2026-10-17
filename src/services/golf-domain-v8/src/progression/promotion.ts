import { MasteryStateV8 } from './types';
export type PromotionPlan = { increaseDifficultyBy: number; introduceVariability: boolean; pressureContext: boolean; reason: string };
export function buildPromotionPlan(state: MasteryStateV8): PromotionPlan {
  if (!state.readyForNextLevel) return { increaseDifficultyBy: 0, introduceVariability: false, pressureContext: false, reason: 'Keep the current level until readiness improves.' };
  return { increaseDifficultyBy: 0.1, introduceVariability: true, pressureContext: state.mastery > 0.86, reason: 'Stable performance supports a controlled increase in challenge.' };
}
