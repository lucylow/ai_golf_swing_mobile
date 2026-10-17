import { HolePlan, TargetWindow } from '../types';
import { clamp } from '../math/statistics';
export function buildTargetWindows(hole: HolePlan, carryOptions: number[]): TargetWindow[] {
  return carryOptions.map((carry, index) => {
    const hazardPenalty = hole.hazards.reduce((risk, hazard) => {
      const distance = hazard.distanceFromTeeYards ?? hole.yardage;
      const proximity = 1 - clamp(Math.abs(distance - carry) / 80, 0, 1);
      return risk + proximity * (hazard.penaltyStroke ? 0.24 : 0.08);
    }, 0);
    const windPenalty = clamp(Math.abs(hole.windMph) / 35, 0, 0.3);
    const expectedSuccess = clamp(0.82 - hazardPenalty - windPenalty - index * 0.03, 0.2, 0.92);
    const risk = clamp(1 - expectedSuccess, 0, 1);
    return { name: `Option ${index + 1}`, centerYards: carry, widthYards: 30 - risk * 10, expectedSuccess, risk, reason: risk < 0.35 ? 'Conservative target preserves approach options.' : 'Aggressive target gains distance but increases exposure.' };
  }).sort((a, b) => b.expectedSuccess - a.expectedSuccess);
}

