import { MasteryStateV8 } from './types';
export const SKILL_CASE_30 = { skill: 'path-control' as const, promotionMultiplier: 0.9, fatigueSensitivity: 0.7, label: 'path control' };
export function adjustedReadiness_30(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_30.promotionMultiplier - state.fatigue * SKILL_CASE_30.fatigueSensitivity)); }
export function recommendedIntensity_30(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_30(state) * 0.5)); }
export function skillLabel_30(): string { return SKILL_CASE_30.label; }
export function shouldReduceLoad_30(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
