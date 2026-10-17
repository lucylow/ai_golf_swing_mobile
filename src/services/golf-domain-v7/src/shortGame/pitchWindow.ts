import { clamp } from '../math/statistics';
export type PitchWindow = { launchDeg: number; carryYards: number; rolloutYards: number; landingWindowYards: [number, number]; cue: string };
export function buildPitchWindow(carryYards: number, landingToleranceYards: number, launchDeg: number): PitchWindow {
  const launch = clamp(launchDeg, 15, 55);
  const rolloutRatio = clamp(0.5 - (launch - 25) * 0.012, 0.08, 0.6);
  const rollout = carryYards * rolloutRatio;
  const low = Math.max(1, carryYards - landingToleranceYards);
  const high = carryYards + landingToleranceYards;
  const cue = launch > 40 ? 'High pitch: prioritize landing precision over total release.' : 'Mid-flight pitch: use landing spot and expected rollout together.';
  return { launchDeg: launch, carryYards, rolloutYards: rollout, landingWindowYards: [low, high], cue };
}

