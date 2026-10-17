import { MasteryStateV8 } from './types';
export const SKILL_CASE_38 = { skill: 'putting-distance' as const, promotionMultiplier: 0.73, fatigueSensitivity: 0.64, label: 'putting distance' };
export function adjustedReadiness_38(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_38.promotionMultiplier - state.fatigue * SKILL_CASE_38.fatigueSensitivity)); }
export function recommendedIntensity_38(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_38(state) * 0.5)); }
export function skillLabel_38(): string { return SKILL_CASE_38.label; }
export function shouldReduceLoad_38(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
