import { ShotInput } from '../types';
import { clamp } from '../math/statistics';
export type PlausibilityResult = { accepted: boolean; score: number; flags: string[] };
export function validateShot(input: ShotInput): PlausibilityResult {
  const flags: string[] = [];
  if (input.swingSpeedMph < 30 || input.swingSpeedMph > 145) flags.push('Swing speed outside product demo range.');
  if (input.spinRpm < 0 || input.spinRpm > 15000) flags.push('Spin outside expected product range.');
  if (Math.abs(input.faceToPathDeg) > 18) flags.push('Face-to-path value is extreme.');
  if (input.strikeEfficiency < 0 || input.strikeEfficiency > 1) flags.push('Strike efficiency must be between 0 and 1.');
  const score = clamp(1 - flags.length * 0.25, 0, 1);
  return { accepted: score >= 0.5, score, flags };
}

