import { MasteryStateV8 } from './types';
export const SKILL_CASE_28 = { skill: 'iron-contact' as const, promotionMultiplier: 0.85, fatigueSensitivity: 0.72, label: 'iron contact' };
export function adjustedReadiness_28(state: MasteryStateV8): number { const raw = state.mastery * 0.6 + state.confidence * 0.25 + state.recentScore * 0.15; return Math.max(0, Math.min(1, raw * SKILL_CASE_28.promotionMultiplier - state.fatigue * SKILL_CASE_28.fatigueSensitivity)); }
export function recommendedIntensity_28(state: MasteryStateV8): number { return Math.max(0.2, Math.min(1, 0.35 + adjustedReadiness_28(state) * 0.5)); }
export function skillLabel_28(): string { return SKILL_CASE_28.label; }
export function shouldReduceLoad_28(state: MasteryStateV8): boolean { return state.fatigue > 0.6 || state.recentVariance > 0.13; }
