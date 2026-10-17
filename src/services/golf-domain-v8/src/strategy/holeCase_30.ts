import { HoleModelV8 } from './types';
export const HOLE_CASE_30 = { archetype: 'island-green', par: 3 as 3|4|5, baseHazardExposure: 0.2, riskPreference: 0.47, rationale: 'Penalty avoidance dominates raw flag-seeking.' };
export function candidatePenalty_30(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_30.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_30(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((30%3)-1) * 0.9)); }
export function strategyNote_30(): string { return HOLE_CASE_30.rationale; }
export function shouldPreferConservative_30(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_30.baseHazardExposure * 0.35; }
