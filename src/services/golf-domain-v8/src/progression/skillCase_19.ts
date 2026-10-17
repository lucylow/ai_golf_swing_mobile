import { MasteryStateV8 } from './types';
export const SKILL_CASE_19 = { skill: 'tempo' as const, promotionMultiplier: 0.8, fatigueSensitivity: 0.72, label: 'tempo' };
export function adjustedReadiness_19(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_19.promotionMultiplier - state.fatigue * SKILL_CASE_19.fatigueSensitivity)); }
export function recommendedIntensity_19(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_19(state) * 0.5)); }
export function skillLabel_19(): string { return SKILL_CASE_19.label; }
export function shouldReduceLoad_19(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
