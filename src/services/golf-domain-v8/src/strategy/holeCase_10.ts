import { HoleModelV8 } from './types';
export const HOLE_CASE_10 = { archetype: 'island-green', par: 3 as 3|4|5, baseHazardExposure: 0.2, riskPreference: 0.53, rationale: 'Penalty avoidance dominates raw flag-seeking.' };
export function candidatePenalty_10(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_10.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_10(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((10%3)-1) * 0.9)); }
export function strategyNote_10(): string { return HOLE_CASE_10.rationale; }
export function shouldPreferConservative_10(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_10.baseHazardExposure * 0.35; }
