import { HolePlan } from '../types';
import { clamp } from '../math/statistics';
export type PinStrategy = { targetYardsFromFront: number; targetSide: 'left' | 'center' | 'right'; missSide: 'left' | 'right' | 'long'; aggression: number; rationale: string };
export function choosePinStrategy(hole: HolePlan, puttingStrength: number): PinStrategy {
  const leftHazards = hole.hazards.filter((hazard) => (hazard.lateralYards ?? 0) < 0).length;
  const rightHazards = hole.hazards.filter((hazard) => (hazard.lateralYards ?? 0) > 0).length;
  const targetSide = leftHazards > rightHazards ? 'right' : rightHazards > leftHazards ? 'left' : 'center';
  const missSide = targetSide === 'left' ? 'right' : targetSide === 'right' ? 'left' : 'long';
  const aggression = clamp(0.4 + puttingStrength * 0.35 - hole.hazards.length * 0.03, 0.15, 0.75);
  const front = clamp(hole.pinYardsFromFront + (aggression - 0.5) * 10, 2, 98);
  return { targetYardsFromFront: front, targetSide, missSide, aggression, rationale: 'Bias the target away from the highest-exposure side and keep the safest recovery miss.' };
}

