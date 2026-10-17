import { MasteryStateV8 } from './types';
export const SKILL_CASE_12 = { skill: 'putting-distance' as const, promotionMultiplier: 0.73, fatigueSensitivity: 0.64, label: 'putting distance' };
export function adjustedReadiness_12(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_12.promotionMultiplier - state.fatigue * SKILL_CASE_12.fatigueSensitivity)); }
export function recommendedIntensity_12(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_12(state) * 0.5)); }
export function skillLabel_12(): string { return SKILL_CASE_12.label; }
export function shouldReduceLoad_12(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
