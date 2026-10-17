import { HoleModelV8 } from './types';
export const HOLE_CASE_29 = { archetype: 'dogleg-right', par: 4 as 3|4|5, baseHazardExposure: 0.16, riskPreference: 0.41, rationale: 'Model target bias around the preferred dogleg angle.' };
export function candidatePenalty_29(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_29.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_29(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((29%3)-1) * 0.9)); }
export function strategyNote_29(): string { return HOLE_CASE_29.rationale; }
export function shouldPreferConservative_29(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_29.baseHazardExposure * 0.35; }
