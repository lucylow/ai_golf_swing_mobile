import { HoleModelV8 } from './types';
export const HOLE_CASE_07 = { archetype: 'risk-reward-par5', par: 5 as 3|4|5, baseHazardExposure: 0.28, riskPreference: 0.35, rationale: 'Compare aggressive and conservative routes explicitly.' };
export function candidatePenalty_07(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_07.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_07(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((7%3)-1) * 0.9)); }
export function strategyNote_07(): string { return HOLE_CASE_07.rationale; }
export function shouldPreferConservative_07(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_07.baseHazardExposure * 0.35; }
