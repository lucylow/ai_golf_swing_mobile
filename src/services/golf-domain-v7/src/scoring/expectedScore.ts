import { clamp } from '../math/statistics';
export type ExpectedScoreInput = { distanceYards: number; lieQuality: number; greenAccess: number; hazardExposure: number; puttingStrength: number };
export type ExpectedScore = { strokes: number; interval: [number, number]; drivers: string[] };
export function estimateExpectedScore(input: ExpectedScoreInput): ExpectedScore {
  const base = input.distanceYards < 80 ? 2.55 : input.distanceYards < 160 ? 3.0 : input.distanceYards < 220 ? 3.55 : 4.15;
  const lie = (1 - clamp(input.lieQuality, 0, 1)) * 0.42;
  const green = (1 - clamp(input.greenAccess, 0, 1)) * 0.35;
  const hazard = clamp(input.hazardExposure, 0, 1) * 0.6;
  const putt = (1 - clamp(input.puttingStrength, 0, 1)) * 0.2;
  const strokes = base + lie + green + hazard + putt;
  return { strokes, interval: [Math.max(1, strokes - 0.35), strokes + 0.55], drivers: ['Distance', 'Lie quality', 'Green access', 'Hazard exposure'] };
}

