import { HoleModelV8 } from './types';
export const HOLE_CASE_26 = { archetype: 'short-par3', par: 3 as 3|4|5, baseHazardExposure: 0.07, riskPreference: 0.6499999999999999, rationale: 'Favor center-green targets with manageable miss zones.' };
export function candidatePenalty_26(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_26.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_26(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((26%3)-1) * 0.9)); }
export function strategyNote_26(): string { return HOLE_CASE_26.rationale; }
export function shouldPreferConservative_26(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_26.baseHazardExposure * 0.35; }
