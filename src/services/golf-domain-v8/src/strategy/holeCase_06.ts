import { HoleModelV8 } from './types';
export const HOLE_CASE_06 = { archetype: 'short-par3', par: 3 as 3|4|5, baseHazardExposure: 0.07, riskPreference: 0.71, rationale: 'Favor center-green targets with manageable miss zones.' };
export function candidatePenalty_06(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_06.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_06(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((6%3)-1) * 0.9)); }
export function strategyNote_06(): string { return HOLE_CASE_06.rationale; }
export function shouldPreferConservative_06(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_06.baseHazardExposure * 0.35; }
