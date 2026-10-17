import { BallFlight, ShotInput } from '../types';
import { clamp, clamp01 } from '../math/statistics';

export type BallFlightCoefficients = {
  launchToCarry: number;
  spinPenalty: number;
  strikeBonus: number;
  attackPenalty: number;
};

const DEFAULT_COEFFICIENTS: BallFlightCoefficients = {
  launchToCarry: 1.42,
  spinPenalty: 0.000012,
  strikeBonus: 0.18,
  attackPenalty: 0.02,
};

export function estimateBallFlight(input: ShotInput, coefficients = DEFAULT_COEFFICIENTS): BallFlight {
  const speed = Math.max(35, input.swingSpeedMph);
  const launch = clamp(input.launchDeg, -5, 45);
  const spin = Math.max(0, input.spinRpm);
  const strike = clamp01(input.strikeEfficiency);
  const liePenalty = input.lie === 'deep-rough' || input.lie === 'sand' ? 0.82 : input.lie === 'rough' ? 0.92 : 1;
  const wind = input.windMph ?? 0;
  const elevation = input.elevationFt ?? 0;
  const categoryFactor = input.clubCategory === 'driver' ? 2.85 : input.clubCategory === 'wood' ? 2.7 : input.clubCategory === 'hybrid' ? 2.5 : input.clubCategory === 'iron' ? 2.08 : 1.4;
  const base = speed * categoryFactor;
  const spinPenalty = spin * coefficients.spinPenalty * Math.max(1, speed / 80);
  const strikeMultiplier = 0.72 + strike * coefficients.strikeBonus;
  const launchFactor = 0.86 + Math.sin((launch * Math.PI) / 180) * 0.42;
  const launchWindow = input.clubCategory === 'driver' ? 14 : input.clubCategory === 'iron' ? 19 : 24;
  const launchAdjustment = 1 - clamp(Math.abs(launch - launchWindow) * 0.009, 0, 0.18);
  const spinAdjustment = 1 - clamp(Math.abs(spin - expectedSpin(input.clubCategory)) / 7000, 0, 0.16);
  const elevationFactor = 1 + clamp(elevation / 5000, -0.06, 0.06);
  const windFactor = 1 + clamp(wind * 0.0035, -0.15, 0.15);
  const carry = Math.max(5, base * strikeMultiplier * launchFactor * launchAdjustment * spinAdjustment * elevationFactor * windFactor * liePenalty - speed * spinPenalty * 0.25);
  const sideOffset = input.faceToPathDeg * 1.8 + input.clubPathDeg * 1.2;
  const curvature = sideOffset * (0.8 + spin / 5000);
  const total = Math.max(carry, carry * (1.08 + Math.max(0, speed - 70) * 0.0007));
  const apex = Math.max(4, carry * (0.18 + launch / 140));
  const descent = clamp(launch + spin / 1800 - 8, 12, 55);
  const confidence = clamp01(0.35 + strike * 0.45 + Math.min(0.2, Math.abs(input.clubPathDeg) < 8 ? 0.15 : 0));
  const notes: string[] = [];
  if (strike < 0.75) notes.push('Strike quality limits carry estimate confidence.');
  if (Math.abs(input.faceToPathDeg) > 4) notes.push('Curvature estimate is sensitive to face/path interaction.');
  if (input.lie && input.lie !== 'tee' && input.lie !== 'fairway') notes.push('Lie adjustment is a simplified product estimate.');
  return { carryYards: carry, totalYards: total, apexYards: apex, launchDeg: launch, descentDeg: descent, sideOffsetYards: sideOffset, curvatureYards: curvature, estimatedConfidence: confidence, notes };
}


function expectedSpin(category: ShotInput['clubCategory']): number {
  switch (category) {
    case 'driver': return 2600;
    case 'wood': return 3400;
    case 'hybrid': return 3900;
    case 'iron': return 5200;
    default: return 7000;
  }
}
