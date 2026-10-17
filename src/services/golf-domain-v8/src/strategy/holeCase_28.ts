import { HoleModelV8 } from './types';
export const HOLE_CASE_28 = { archetype: 'dogleg-left', par: 4 as 3|4|5, baseHazardExposure: 0.16, riskPreference: 0.35, rationale: 'Model target bias around the preferred dogleg angle.' };
export function candidatePenalty_28(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_28.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_28(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((28%3)-1) * 0.9)); }
export function strategyNote_28(): string { return HOLE_CASE_28.rationale; }
export function shouldPreferConservative_28(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_28.baseHazardExposure * 0.35; }
