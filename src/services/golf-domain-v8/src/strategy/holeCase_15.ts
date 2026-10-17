import { HoleModelV8 } from './types';
export const HOLE_CASE_15 = { archetype: 'long-par3', par: 3 as 3|4|5, baseHazardExposure: 0.12, riskPreference: 0.41, rationale: 'Weight green access and lateral dispersion heavily.' };
export function candidatePenalty_15(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_15.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_15(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((15%3)-1) * 0.9)); }
export function strategyNote_15(): string { return HOLE_CASE_15.rationale; }
export function shouldPreferConservative_15(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_15.baseHazardExposure * 0.35; }
