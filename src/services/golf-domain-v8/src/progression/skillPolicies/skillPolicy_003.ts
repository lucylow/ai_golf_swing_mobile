import { MasteryStateV8 } from '../types';
import { expectedSuccess } from '../difficulty';
export const SKILL_POLICY_003 = { skill: 'tempo' as const, preferredRange: [0.50, 0.84] as [number, number], fatiguePenalty: 0.225, variabilityBonus: 0.110 };
export function readinessForPolicy_003(state: MasteryStateV8): number {
  const base = expectedSuccess(state, state.currentDifficulty);
  const fatigue = Math.min(0.3, state.fatigue * SKILL_POLICY_003.fatiguePenalty);
  const inRange = state.currentDifficulty >= SKILL_POLICY_003.preferredRange[0] && state.currentDifficulty <= SKILL_POLICY_003.preferredRange[1];
  return Math.max(0, Math.min(1, base - fatigue + (inRange ? SKILL_POLICY_003.variabilityBonus : 0)));
}
export function policyMessage_003(state: MasteryStateV8): string {
  const readiness = readinessForPolicy_003(state);
  return readiness > 0.78 ? 'Ready for more variability.' : readiness < 0.45 ? 'Reduce complexity and rebuild successful repetitions.' : 'Stabilize the current pattern.';
}
