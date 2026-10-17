import { MasteryStateV8 } from './types';
export const SKILL_CASE_33 = { skill: 'wedge-distance' as const, promotionMultiplier: 0.76, fatigueSensitivity: 0.65, label: 'wedge distance' };
export function adjustedReadiness_33(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_33.promotionMultiplier - state.fatigue * SKILL_CASE_33.fatigueSensitivity)); }
export function recommendedIntensity_33(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_33(state) * 0.5)); }
export function skillLabel_33(): string { return SKILL_CASE_33.label; }
export function shouldReduceLoad_33(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
