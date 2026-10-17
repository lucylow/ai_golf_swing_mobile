import { clamp } from '../math/statistics';
export type TeeShotRisk = { risk: number; expectedPlayablePct: number; dominantRisk: string; recommendation: string };
export function scoreTeeShotRisk(landingWidthYards: number, curvatureYards: number, hazardExposure: number, speed: number): TeeShotRisk {
  const widthPenalty = clamp(1 - landingWidthYards / 45, 0, 1);
  const curvaturePenalty = clamp(Math.abs(curvatureYards) / 35, 0, 1);
  const speedPenalty = clamp((speed - 100) / 45, 0, 0.35);
  const risk = clamp(widthPenalty * 0.4 + curvaturePenalty * 0.25 + hazardExposure * 0.3 + speedPenalty * 0.05, 0, 1);
  const dominantRisk = hazardExposure > widthPenalty && hazardExposure > curvaturePenalty ? 'hazard exposure' : curvaturePenalty > widthPenalty ? 'curvature' : 'landing width';
  const recommendation = risk < 0.35 ? 'Use normal stock shot.' : risk < 0.58 ? 'Bias target away from the dominant miss.' : 'Consider a lower-variance club/target combination.';
  return { risk, expectedPlayablePct: 1 - risk, dominantRisk, recommendation };
}

