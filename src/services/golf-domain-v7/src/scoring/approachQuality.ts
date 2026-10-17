import { clamp } from '../math/statistics';
export type ApproachQuality = { score: number; proximityYards: number; greenChance: number; missPattern: string };
export function scoreApproach(distanceYards: number, proximityYards: number, greenHit: boolean, hazardAvoided: boolean): ApproachQuality {
  const distanceDifficulty = clamp(distanceYards / 220, 0.2, 1);
  const proximityScore = clamp(1 - proximityYards / (18 + distanceDifficulty * 24), 0, 1);
  const greenBonus = greenHit ? 0.22 : 0;
  const hazardBonus = hazardAvoided ? 0.1 : 0;
  const score = clamp(proximityScore * 0.68 + greenBonus + hazardBonus, 0, 1);
  return { score, proximityYards, greenChance: clamp(score + 0.08, 0, 1), missPattern: greenHit ? 'green-hit' : proximityYards > 30 ? 'long-miss' : 'short/mid miss' };
}

