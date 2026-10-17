import { MasteryStateV8 } from './types';
export const SKILL_CASE_17 = { skill: 'path-control' as const, promotionMultiplier: 0.9, fatigueSensitivity: 0.7, label: 'path control' };
export function adjustedReadiness_17(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_17.promotionMultiplier - state.fatigue * SKILL_CASE_17.fatigueSensitivity)); }
export function recommendedIntensity_17(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_17(state) * 0.5)); }
export function skillLabel_17(): string { return SKILL_CASE_17.label; }
export function shouldReduceLoad_17(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
