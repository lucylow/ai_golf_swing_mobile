import { HoleModelV8 } from './types';
export const HOLE_CASE_25 = { archetype: 'long-par3', par: 3 as 3|4|5, baseHazardExposure: 0.12, riskPreference: 0.59, rationale: 'Weight green access and lateral dispersion heavily.' };
export function candidatePenalty_25(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_25.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_25(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((25%3)-1) * 0.9)); }
export function strategyNote_25(): string { return HOLE_CASE_25.rationale; }
export function shouldPreferConservative_25(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_25.baseHazardExposure * 0.35; }
