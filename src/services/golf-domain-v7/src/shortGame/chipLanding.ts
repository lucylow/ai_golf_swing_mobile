import { clamp } from '../math/statistics';
export type ChipWindow = { landingYards: number; rolloutYards: number; totalYards: number; windowConfidence: number; cue: string };
export function estimateChipWindow(landingYards: number, carryRatio: number, lieFactor: number): ChipWindow {
  const ratio = clamp(carryRatio, 0.08, 0.95);
  const totalYards = landingYards / ratio;
  const rolloutYards = totalYards - landingYards;
  const confidence = clamp(0.4 + lieFactor * 0.5, 0, 1);
  const cue = ratio < 0.3 ? 'Low landing point: plan for predictable rollout.' : ratio > 0.65 ? 'Higher landing point: check carry sensitivity and landing window.' : 'Balanced carry-to-roll ratio.';
  return { landingYards, rolloutYards, totalYards, windowConfidence: confidence, cue };
}

