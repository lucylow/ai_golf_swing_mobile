import { MasteryStateV8 } from './types';
export const SKILL_CASE_01 = { skill: 'driver' as const, promotionMultiplier: 0.92, fatigueSensitivity: 0.78, label: 'driver' };
export function adjustedReadiness_01(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_01.promotionMultiplier - state.fatigue * SKILL_CASE_01.fatigueSensitivity)); }
export function recommendedIntensity_01(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_01(state) * 0.5)); }
export function skillLabel_01(): string { return SKILL_CASE_01.label; }
export function shouldReduceLoad_01(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
