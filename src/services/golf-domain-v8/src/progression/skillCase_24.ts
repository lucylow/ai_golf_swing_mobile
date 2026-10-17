import { MasteryStateV8 } from './types';
export const SKILL_CASE_24 = { skill: 'putting-start-line' as const, promotionMultiplier: 0.74, fatigueSensitivity: 0.62, label: 'putting start line' };
export function adjustedReadiness_24(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_24.promotionMultiplier - state.fatigue * SKILL_CASE_24.fatigueSensitivity)); }
export function recommendedIntensity_24(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_24(state) * 0.5)); }
export function skillLabel_24(): string { return SKILL_CASE_24.label; }
export function shouldReduceLoad_24(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
