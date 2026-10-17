import { HoleModelV8 } from './types';
export const HOLE_CASE_12 = { archetype: 'narrow-par4', par: 4 as 3|4|5, baseHazardExposure: 0.08, riskPreference: 0.6499999999999999, rationale: 'Prioritize dispersion containment over maximum carry.' };
export function candidatePenalty_12(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_12.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_12(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((12%3)-1) * 0.9)); }
export function strategyNote_12(): string { return HOLE_CASE_12.rationale; }
export function shouldPreferConservative_12(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_12.baseHazardExposure * 0.35; }
