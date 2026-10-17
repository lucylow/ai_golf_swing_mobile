import { HoleModelV8 } from './types';
export const HOLE_CASE_01 = { archetype: 'reachable-par5', par: 5 as 3|4|5, baseHazardExposure: 0.18, riskPreference: 0.41, rationale: 'Favor two-shot routes when penalty exposure remains controlled.' };
export function candidatePenalty_01(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_01.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_01(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((1%3)-1) * 0.9)); }
export function strategyNote_01(): string { return HOLE_CASE_01.rationale; }
export function shouldPreferConservative_01(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_01.baseHazardExposure * 0.35; }
