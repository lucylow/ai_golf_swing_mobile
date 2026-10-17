import { MasteryStateV8 } from './types';
export const SKILL_CASE_39 = { skill: 'course-management' as const, promotionMultiplier: 0.78, fatigueSensitivity: 0.7, label: 'course management' };
export function adjustedReadiness_39(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_39.promotionMultiplier - state.fatigue * SKILL_CASE_39.fatigueSensitivity)); }
export function recommendedIntensity_39(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_39(state) * 0.5)); }
export function skillLabel_39(): string { return SKILL_CASE_39.label; }
export function shouldReduceLoad_39(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
