import { MasteryStateV8 } from './types';
export const SKILL_CASE_36 = { skill: 'bunker' as const, promotionMultiplier: 0.68, fatigueSensitivity: 0.55, label: 'bunker' };
export function adjustedReadiness_36(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_36.promotionMultiplier - state.fatigue * SKILL_CASE_36.fatigueSensitivity)); }
export function recommendedIntensity_36(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_36(state) * 0.5)); }
export function skillLabel_36(): string { return SKILL_CASE_36.label; }
export function shouldReduceLoad_36(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
