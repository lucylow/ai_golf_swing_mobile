import { HoleModelV8 } from './types';
export const HOLE_CASE_27 = { archetype: 'risk-reward-par5', par: 5 as 3|4|5, baseHazardExposure: 0.28, riskPreference: 0.71, rationale: 'Compare aggressive and conservative routes explicitly.' };
export function candidatePenalty_27(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_27.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_27(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((27%3)-1) * 0.9)); }
export function strategyNote_27(): string { return HOLE_CASE_27.rationale; }
export function shouldPreferConservative_27(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_27.baseHazardExposure * 0.35; }
