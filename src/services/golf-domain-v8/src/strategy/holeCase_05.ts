import { HoleModelV8 } from './types';
export const HOLE_CASE_05 = { archetype: 'long-par3', par: 3 as 3|4|5, baseHazardExposure: 0.12, riskPreference: 0.6499999999999999, rationale: 'Weight green access and lateral dispersion heavily.' };
export function candidatePenalty_05(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_05.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_05(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((5%3)-1) * 0.9)); }
export function strategyNote_05(): string { return HOLE_CASE_05.rationale; }
export function shouldPreferConservative_05(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_05.baseHazardExposure * 0.35; }
