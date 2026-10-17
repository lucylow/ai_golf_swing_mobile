import { HoleHazard, HolePlan } from '../types';
import { clamp } from '../math/statistics';
export type HazardRisk = { hazardId: string; exposure: number; penalty: number; label: string };
export function scoreHazards(hole: HolePlan, shotDistance: number): HazardRisk[] {
  return hole.hazards.map((hazard) => {
    const distance = hazard.distanceFromTeeYards ?? shotDistance;
    const exposure = clamp(1 - Math.abs(distance - shotDistance) / 90, 0, 1);
    const penalty = hazard.penaltyStroke ? 1 : 0.35;
    const label = exposure > 0.65 ? 'high exposure' : exposure > 0.3 ? 'moderate exposure' : 'low exposure';
    return { hazardId: hazard.id, exposure, penalty, label };
  }).sort((a, b) => b.exposure - a.exposure);
}

