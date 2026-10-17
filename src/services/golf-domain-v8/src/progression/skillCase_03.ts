import { MasteryStateV8 } from './types';
export const SKILL_CASE_03 = { skill: 'face-control' as const, promotionMultiplier: 0.88, fatigueSensitivity: 0.68, label: 'face control' };
export function adjustedReadiness_03(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_03.promotionMultiplier - state.fatigue * SKILL_CASE_03.fatigueSensitivity)); }
export function recommendedIntensity_03(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_03(state) * 0.5)); }
export function skillLabel_03(): string { return SKILL_CASE_03.label; }
export function shouldReduceLoad_03(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
