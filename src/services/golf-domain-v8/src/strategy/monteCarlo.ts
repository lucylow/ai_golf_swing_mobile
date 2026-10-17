import { HoleModelV8, StrategyCandidate, ClubStrategyProfile, SimulationOptions, Vec2 } from './types';
import { mulberry32 } from './random';
import { targetPointFromDispersion } from './dispersion';
import { classifyLanding } from './hazards';
import { distance, projectToRay } from './geometry';
import { windCarryAdjustment, windLateralAdjustment } from './wind3d';
import { expectedStrokesToFinish } from './expectedScore';

export type SimulationAggregate = {
  strokes: number[];
  mean: number;
  median: number;
  birdieProbability: number;
  parProbability: number;
  bogeyOrWorseProbability: number;
  penaltyProbability: number;
  recoveryProbability: number;
};

function median(xs: number[]): number { const a = xs.slice().sort((x, y) => x - y); if (!a.length) return 0; const m = Math.floor(a.length / 2); return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; }

export function simulateCandidate(hole: HoleModelV8, start: Vec2, candidate: { club: ClubStrategyProfile; target: Vec2 }, options: SimulationOptions): SimulationAggregate {
  const rng = mulberry32(options.seed);
  const strokes: number[] = [];
  let birdies = 0, pars = 0, bogeys = 0, penalties = 0, recoveries = 0;
  for (let i = 0; i < options.iterations; i += 1) {
    const adjustedCarry = windCarryAdjustment(candidate.club.carryYards, Math.atan2(candidate.target.y - start.y, candidate.target.x - start.x) * 180 / Math.PI, hole.windMph, hole.windDirectionDeg);
    const impactPoint = targetPointFromDispersion(start, projectToRay(start, Math.atan2(candidate.target.y - start.y, candidate.target.x - start.x) * 180 / Math.PI, adjustedCarry), candidate.club, rng);
    const windLat = windLateralAdjustment(hole.windMph, Math.atan2(candidate.target.y - start.y, candidate.target.x - start.x) * 180 / Math.PI, hole.windDirectionDeg, 2.2);
    const finalPosition = { x: impactPoint.x, y: impactPoint.y + windLat };
    const landing = classifyLanding(hole, finalPosition);
    let shotCount = 1 + landing.penalty;
    if (landing.penalty) penalties += 1;
    if (landing.recoveryPenalty > 0) recoveries += 1;
    const toPin = distance(finalPosition, hole.green.pin);
    const finish = expectedStrokesToFinish(toPin, landing.lie) + landing.recoveryPenalty;
    shotCount += Math.max(0.2, finish - 1);
    strokes.push(hole.par + (shotCount - 1) - (hole.par - 1));
    const total = shotCount;
    if (total <= hole.par - 1) birdies += 1;
    else if (total <= hole.par + 0.25) pars += 1;
    else bogeys += 1;
  }
  return { strokes, mean: strokes.reduce((a, b) => a + b, 0) / strokes.length, median: median(strokes), birdieProbability: birdies / options.iterations, parProbability: pars / options.iterations, bogeyOrWorseProbability: bogeys / options.iterations, penaltyProbability: penalties / options.iterations, recoveryProbability: recoveries / options.iterations };
}

export function rankCandidates(results: { candidate: StrategyCandidate; sim: SimulationAggregate }[], riskAversion = 0.5): StrategyCandidate[] {
  return results.slice().sort((a, b) => {
    const scoreA = a.sim.mean + riskAversion * a.sim.bogeyOrWorseProbability + (1 - riskAversion) * a.sim.penaltyProbability;
    const scoreB = b.sim.mean + riskAversion * b.sim.bogeyOrWorseProbability + (1 - riskAversion) * b.sim.penaltyProbability;
    return scoreA - scoreB;
  }).map((x) => ({ ...x.candidate, expectedScore: x.sim.mean, birdieProbability: x.sim.birdieProbability, parProbability: x.sim.parProbability, bogeyOrWorseProbability: x.sim.bogeyOrWorseProbability, penaltyProbability: x.sim.penaltyProbability, recoveryProbability: x.sim.recoveryProbability }));
}
