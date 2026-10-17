import { clamp } from '../math/statistics';

export type WindVector = { speedMph: number; directionDeg: number };
export type WindEffect = { headTailYards: number; crossYards: number; faceAdjustmentDeg: number; notes: string[] };

function deltaAngleDeg(a: number, b: number): number {
  let delta = (a - b) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

export function estimateWindEffect(wind: WindVector, shotDirectionDeg: number, carryYards: number): WindEffect {
  const relative = deltaAngleDeg(wind.directionDeg, shotDirectionDeg);
  const radians = relative * Math.PI / 180;
  const headTail = Math.cos(radians) * wind.speedMph;
  const cross = Math.sin(radians) * wind.speedMph;
  const headTailYards = carryYards * clamp(headTail * 0.0045, -0.22, 0.22);
  const crossYards = cross * 0.72;
  const faceAdjustmentDeg = clamp(cross * 0.04, -2.5, 2.5);
  const notes: string[] = [];
  if (Math.abs(headTail) > 8) notes.push(headTail > 0 ? 'Expect a meaningful headwind reduction.' : 'Expect a meaningful tailwind increase.');
  if (Math.abs(cross) > 8) notes.push('Crosswind can change both aim and curvature exposure.');
  return { headTailYards, crossYards, faceAdjustmentDeg, notes };
}

