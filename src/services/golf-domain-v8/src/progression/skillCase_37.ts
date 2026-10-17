import { MasteryStateV8 } from './types';
export const SKILL_CASE_37 = { skill: 'putting-start-line' as const, promotionMultiplier: 0.74, fatigueSensitivity: 0.62, label: 'putting start line' };
export function adjustedReadiness_37(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_37.promotionMultiplier - state.fatigue * SKILL_CASE_37.fatigueSensitivity)); }
export function recommendedIntensity_37(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_37(state) * 0.5)); }
export function skillLabel_37(): string { return SKILL_CASE_37.label; }
export function shouldReduceLoad_37(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
