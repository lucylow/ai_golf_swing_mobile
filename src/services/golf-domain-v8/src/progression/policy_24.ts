import { MasteryStateV8 } from './types';
export function readinessModifier_24(state: MasteryStateV8): number {
  const masteryTerm = state.mastery * 0.6;
  const confidenceTerm = state.confidence * 0.25;
  const variancePenalty = Math.min(0.3, state.recentVariance * 1.2);
  const fatiguePenalty = Math.min(0.25, state.fatigue * 0.4);
  return Math.max(0, Math.min(1, masteryTerm + confidenceTerm + 0.1 - variancePenalty - fatiguePenalty));
}
