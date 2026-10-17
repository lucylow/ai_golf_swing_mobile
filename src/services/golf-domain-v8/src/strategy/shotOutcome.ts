import { HoleModelV8, Vec2, LieV8, ClubStrategyProfile } from './types';
import { classifyLanding } from './hazards';
import { distance } from './geometry';
export type ShotOutcomeV8 = { position: Vec2; lie: LieV8; penalty: number; recovery: number; toPinYards: number; hazardId?: string };
export function resolveShot(hole: HoleModelV8, position: Vec2): ShotOutcomeV8 { const hit = classifyLanding(hole, position); return { position, lie: hit.lie, penalty: hit.penalty, recovery: hit.recoveryPenalty, toPinYards: distance(position, hole.green.pin), hazardId: hit.hazard?.id }; }
export function clubPenaltyPrior(club: ClubStrategyProfile, hazardExposure: number): number { return Math.max(0, Math.min(0.95, club.penaltyProbability + hazardExposure * 0.25)); }
