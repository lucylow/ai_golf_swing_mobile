import { HoleModelV8, ClubStrategyProfile, StrategyCandidate, SimulationOptions, Vec2 } from './types';
import { simulateCandidate, rankCandidates } from './monteCarlo';
import { projectToRay } from './geometry';

export function buildCandidateTargets(hole: HoleModelV8, start: Vec2, club: ClubStrategyProfile): StrategyCandidate[] {
  const heading = Math.atan2(hole.green.pin.y - start.y, hole.green.pin.x - start.x) * 180 / Math.PI;
  const targetDistances = [club.carryYards * 0.88, club.carryYards * 0.96, club.carryYards];
  const biases = [-12, 0, 12];
  return biases.map((bias, i) => ({ id: `${club.clubId}-${i}`, label: `${club.name} ${bias === 0 ? 'center' : bias < 0 ? 'left' : 'right'}`, clubId: club.clubId, target: projectToRay(start, heading, targetDistances[i]), aimBiasYards: bias, expectedScore: 99, birdieProbability: 0, parProbability: 0, bogeyOrWorseProbability: 1, penaltyProbability: 0, recoveryProbability: 0, confidence: 0.72, rationale: [bias === 0 ? 'Centerline target.' : `Aim ${Math.abs(bias)} yd ${bias < 0 ? 'left' : 'right'} of center.`, 'Candidate evaluated by dispersion and hazard model.'] }));
}

export function simulateHolePlans(hole: HoleModelV8, start: Vec2, clubs: readonly ClubStrategyProfile[], options: SimulationOptions): StrategyCandidate[] {
  const results: { candidate: StrategyCandidate; sim: ReturnType<typeof simulateCandidate> }[] = [];
  clubs.forEach((club, cIndex) => buildCandidateTargets(hole, start, club).forEach((candidate, i) => {
    const sim = simulateCandidate(hole, start, { club, target: candidate.target }, { ...options, seed: options.seed + cIndex * 101 + i * 17 });
    results.push({ candidate, sim });
  }));
  return rankCandidates(results, options.riskAversion).slice(0, 5);
}
