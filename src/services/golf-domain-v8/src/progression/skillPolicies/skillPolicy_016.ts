import { MasteryStateV8 } from '../types';
import { expectedSuccess } from '../difficulty';
export const SKILL_POLICY_016 = { skill: 'tempo' as const, preferredRange: [0.35, 0.76] as [number, number], fatiguePenalty: 0.250, variabilityBonus: 0.090 };
export function readinessForPolicy_016(state: MasteryStateV8): number {
  const base = expectedSuccess(state, state.currentDifficulty);
  const fatigue = Math.min(0.3, state.fatigue * SKILL_POLICY_016.fatiguePenalty);
  const inRange = state.currentDifficulty >= SKILL_POLICY_016.preferredRange[0] && state.currentDifficulty <= SKILL_POLICY_016.preferredRange[1];
  return Math.max(0, Math.min(1, base - fatigue + (inRange ? SKILL_POLICY_016.variabilityBonus : 0)));
}
export function policyMessage_016(state: MasteryStateV8): string {
  const readiness = readinessForPolicy_016(state);
  return readiness > 0.78 ? 'Ready for more variability.' : readiness < 0.45 ? 'Reduce complexity and rebuild successful repetitions.' : 'Stabilize the current pattern.';
}
