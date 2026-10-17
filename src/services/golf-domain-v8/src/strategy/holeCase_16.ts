import { HoleModelV8 } from './types';
export const HOLE_CASE_16 = { archetype: 'short-par3', par: 3 as 3|4|5, baseHazardExposure: 0.07, riskPreference: 0.47, rationale: 'Favor center-green targets with manageable miss zones.' };
export function candidatePenalty_16(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_16.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_16(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((16%3)-1) * 0.9)); }
export function strategyNote_16(): string { return HOLE_CASE_16.rationale; }
export function shouldPreferConservative_16(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_16.baseHazardExposure * 0.35; }
