import { MasteryStateV8 } from './types';
export const SKILL_CASE_23 = { skill: 'bunker' as const, promotionMultiplier: 0.68, fatigueSensitivity: 0.55, label: 'bunker' };
export function adjustedReadiness_23(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_23.promotionMultiplier - state.fatigue * SKILL_CASE_23.fatigueSensitivity)); }
export function recommendedIntensity_23(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_23(state) * 0.5)); }
export function skillLabel_23(): string { return SKILL_CASE_23.label; }
export function shouldReduceLoad_23(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
