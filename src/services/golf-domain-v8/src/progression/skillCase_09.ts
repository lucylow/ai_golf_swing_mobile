import { MasteryStateV8 } from './types';
export const SKILL_CASE_09 = { skill: 'chipping' as const, promotionMultiplier: 0.7, fatigueSensitivity: 0.58, label: 'chipping' };
export function adjustedReadiness_09(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_09.promotionMultiplier - state.fatigue * SKILL_CASE_09.fatigueSensitivity)); }
export function recommendedIntensity_09(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_09(state) * 0.5)); }
export function skillLabel_09(): string { return SKILL_CASE_09.label; }
export function shouldReduceLoad_09(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
