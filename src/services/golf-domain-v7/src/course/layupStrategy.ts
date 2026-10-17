import { HolePlan, TargetWindow } from '../types';
import { clamp } from '../math/statistics';
export type LayupPlan = { preferredYards: number; window: [number, number]; reason: string; risk: number };
export function chooseLayup(hole: HolePlan, nextApproachYards: number, landingWindows: number[]): LayupPlan {
  const preferred = landingWindows.reduce((best, yards) => Math.abs(yards - nextApproachYards) < Math.abs(best - nextApproachYards) ? yards : best, landingWindows[0] ?? 100);
  const hazardRisk = hole.hazards.length * 0.05;
  const risk = clamp(hazardRisk + Math.abs(preferred - nextApproachYards) / 120, 0, 1);
  return { preferredYards: preferred, window: [preferred - 8, preferred + 8], reason: 'Choose the layup that leaves a repeatable wedge/approach window while reducing hazard exposure.', risk };
}

