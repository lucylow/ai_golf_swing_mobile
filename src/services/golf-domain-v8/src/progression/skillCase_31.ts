import { MasteryStateV8 } from './types';
export const SKILL_CASE_31 = { skill: 'transition' as const, promotionMultiplier: 0.83, fatigueSensitivity: 0.75, label: 'transition' };
export function adjustedReadiness_31(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_31.promotionMultiplier - state.fatigue * SKILL_CASE_31.fatigueSensitivity)); }
export function recommendedIntensity_31(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_31(state) * 0.5)); }
export function skillLabel_31(): string { return SKILL_CASE_31.label; }
export function shouldReduceLoad_31(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
