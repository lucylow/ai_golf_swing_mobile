import { MasteryStateV8 } from './types';
export const SKILL_CASE_08 = { skill: 'pitching' as const, promotionMultiplier: 0.72, fatigueSensitivity: 0.6, label: 'pitching' };
export function adjustedReadiness_08(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_08.promotionMultiplier - state.fatigue * SKILL_CASE_08.fatigueSensitivity)); }
export function recommendedIntensity_08(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_08(state) * 0.5)); }
export function skillLabel_08(): string { return SKILL_CASE_08.label; }
export function shouldReduceLoad_08(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
