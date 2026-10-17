import { ShotDispersion, ClubStrategyProfile, Vec2 } from './types';
import { normal } from './random';
export function covarianceAdjustedSample(d: ShotDispersion, rng: () => number): { forward: number; lateral: number } {
  const z1 = normal(rng), z2 = normal(rng);
  const lateral = d.lateralMean + d.lateralStd * z1;
  const correlationPart = d.correlation * d.forwardStd * z1;
  const independent = Math.sqrt(Math.max(0, 1 - d.correlation ** 2)) * d.forwardStd * z2;
  return { forward: d.forwardMean + correlationPart + independent, lateral };
}
export function targetPointFromDispersion(start: Vec2, target: Vec2, club: ClubStrategyProfile, rng: () => number): Vec2 {
  const dx = target.x - start.x, dy = target.y - start.y;
  const heading = Math.atan2(dy, dx) * 180 / Math.PI;
  const sample = covarianceAdjustedSample(club.dispersion, rng);
  const rad = heading * Math.PI / 180;
  const forward = { x: Math.cos(rad) * sample.forward, y: Math.sin(rad) * sample.forward };
  const lateral = { x: -Math.sin(rad) * sample.lateral, y: Math.cos(rad) * sample.lateral };
  return { x: start.x + forward.x + lateral.x, y: start.y + forward.y + lateral.y };
}
export function dispersionCoverageAtRadius(stdYards: number, radiusYards: number): number { return 1 - Math.exp(-radiusYards * radiusYards / Math.max(1e-6, 2 * stdYards * stdYards)); }
