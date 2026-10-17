import { MasteryStateV8 } from '../types';
import { expectedSuccess } from '../difficulty';
export const SKILL_POLICY_014 = { skill: 'iron-contact' as const, preferredRange: [0.45, 0.88] as [number, number], fatiguePenalty: 0.200, variabilityBonus: 0.120 };
export function readinessForPolicy_014(state: MasteryStateV8): number {
  const base = expectedSuccess(state, state.currentDifficulty);
  const fatigue = Math.min(0.3, state.fatigue * SKILL_POLICY_014.fatiguePenalty);
  const inRange = state.currentDifficulty >= SKILL_POLICY_014.preferredRange[0] && state.currentDifficulty <= SKILL_POLICY_014.preferredRange[1];
  return Math.max(0, Math.min(1, base - fatigue + (inRange ? SKILL_POLICY_014.variabilityBonus : 0)));
}
export function policyMessage_014(state: MasteryStateV8): string {
  const readiness = readinessForPolicy_014(state);
  return readiness > 0.78 ? 'Ready for more variability.' : readiness < 0.45 ? 'Reduce complexity and rebuild successful repetitions.' : 'Stabilize the current pattern.';
}
