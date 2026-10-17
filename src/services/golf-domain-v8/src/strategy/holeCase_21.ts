import { HoleModelV8 } from './types';
export const HOLE_CASE_21 = { archetype: 'reachable-par5', par: 5 as 3|4|5, baseHazardExposure: 0.18, riskPreference: 0.35, rationale: 'Favor two-shot routes when penalty exposure remains controlled.' };
export function candidatePenalty_21(hole: HoleModelV8): number { return Math.min(0.95, HOLE_CASE_21.baseHazardExposure + hole.hazards.length * 0.015 + hole.windMph * 0.004); }
export function targetBias_21(windMph: number): number { return Math.max(-18, Math.min(18, windMph * ((21%3)-1) * 0.9)); }
export function strategyNote_21(): string { return HOLE_CASE_21.rationale; }
export function shouldPreferConservative_21(penaltyProbability: number): boolean { return penaltyProbability > 0.12 + HOLE_CASE_21.baseHazardExposure * 0.35; }
