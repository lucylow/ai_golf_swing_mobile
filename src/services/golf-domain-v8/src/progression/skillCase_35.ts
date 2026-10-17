import { MasteryStateV8 } from './types';
export const SKILL_CASE_35 = { skill: 'chipping' as const, promotionMultiplier: 0.7, fatigueSensitivity: 0.58, label: 'chipping' };
export function adjustedReadiness_35(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_35.promotionMultiplier - state.fatigue * SKILL_CASE_35.fatigueSensitivity)); }
export function recommendedIntensity_35(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_35(state) * 0.5)); }
export function skillLabel_35(): string { return SKILL_CASE_35.label; }
export function shouldReduceLoad_35(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
