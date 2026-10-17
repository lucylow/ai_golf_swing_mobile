import { MasteryStateV8 } from '../types';
import { expectedSuccess } from '../difficulty';
export const SKILL_POLICY_020 = { skill: 'driver' as const, preferredRange: [0.35, 0.72] as [number, number], fatiguePenalty: 0.200, variabilityBonus: 0.080 };
export function readinessForPolicy_020(state: MasteryStateV8): number {
  const base = expectedSuccess(state, state.currentDifficulty);
  const fatigue = Math.min(0.3, state.fatigue * SKILL_POLICY_020.fatiguePenalty);
  const inRange = state.currentDifficulty >= SKILL_POLICY_020.preferredRange[0] && state.currentDifficulty <= SKILL_POLICY_020.preferredRange[1];
  return Math.max(0, Math.min(1, base - fatigue + (inRange ? SKILL_POLICY_020.variabilityBonus : 0)));
}
export function policyMessage_020(state: MasteryStateV8): string {
  const readiness = readinessForPolicy_020(state);
  return readiness > 0.78 ? 'Ready for more variability.' : readiness < 0.45 ? 'Reduce complexity and rebuild successful repetitions.' : 'Stabilize the current pattern.';
}
