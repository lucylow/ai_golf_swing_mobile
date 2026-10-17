import { MasteryStateV8 } from '../types';
import { expectedSuccess } from '../difficulty';
export const SKILL_POLICY_002 = { skill: 'path-control' as const, preferredRange: [0.45, 0.80] as [number, number], fatiguePenalty: 0.200, variabilityBonus: 0.100 };
export function readinessForPolicy_002(state: MasteryStateV8): number {
  const base = expectedSuccess(state, state.currentDifficulty);
  const fatigue = Math.min(0.3, state.fatigue * SKILL_POLICY_002.fatiguePenalty);
  const inRange = state.currentDifficulty >= SKILL_POLICY_002.preferredRange[0] && state.currentDifficulty <= SKILL_POLICY_002.preferredRange[1];
  return Math.max(0, Math.min(1, base - fatigue + (inRange ? SKILL_POLICY_002.variabilityBonus : 0)));
}
export function policyMessage_002(state: MasteryStateV8): string {
  const readiness = readinessForPolicy_002(state);
  return readiness > 0.78 ? 'Ready for more variability.' : readiness < 0.45 ? 'Reduce complexity and rebuild successful repetitions.' : 'Stabilize the current pattern.';
}
