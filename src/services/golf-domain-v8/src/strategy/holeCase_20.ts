import { HoleModelV8 } from './types';
export const HOLE_CASE_20 = { archetype: 'island-green', par: 3 as 3|4|5, baseHazardExposure: 0.2, riskPreference: 0.71, rationale: 'Penalty avoidance dominates raw flag-seeking.' };
export function candidatePenalty_20(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_20.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_20(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((20%3)-1) * 0.9)); }
export function strategyNote_20(): string { return HOLE_CASE_20.rationale; }
export function shouldPreferConservative_20(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_20.baseHazardExposure * 0.35; }
