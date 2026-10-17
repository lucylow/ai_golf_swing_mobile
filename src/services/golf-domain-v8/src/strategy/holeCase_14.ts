import { HoleModelV8 } from './types';
export const HOLE_CASE_14 = { archetype: 'short-par4', par: 4 as 3|4|5, baseHazardExposure: 0.1, riskPreference: 0.35, rationale: 'Favor position and wedge access over raw driving distance.' };
export function candidatePenalty_14(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_14.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_14(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((14%3)-1) * 0.9)); }
export function strategyNote_14(): string { return HOLE_CASE_14.rationale; }
export function shouldPreferConservative_14(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_14.baseHazardExposure * 0.35; }
