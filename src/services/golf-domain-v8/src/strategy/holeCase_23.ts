import { HoleModelV8 } from './types';
export const HOLE_CASE_23 = { archetype: 'long-par4', par: 4 as 3|4|5, baseHazardExposure: 0.22, riskPreference: 0.47, rationale: 'Accept moderate risk when it materially reduces approach distance.' };
export function candidatePenalty_23(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_23.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_23(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((23%3)-1) * 0.9)); }
export function strategyNote_23(): string { return HOLE_CASE_23.rationale; }
export function shouldPreferConservative_23(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_23.baseHazardExposure * 0.35; }
