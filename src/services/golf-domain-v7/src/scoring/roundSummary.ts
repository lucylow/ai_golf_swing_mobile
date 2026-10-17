import { mean, standardDeviation } from '../math/statistics';
export type HoleResult = { hole: number; par: number; score: number; penalties: number; putts: number; fairwayHit?: boolean; greenHit?: boolean };
export type RoundSummary = { score: number; toPar: number; putts: number; penalties: number; fairwaysPct: number; greensPct: number; consistency: number; headline: string };
export function summarizeRound(results: HoleResult[]): RoundSummary {
  const score = results.reduce((sum, hole) => sum + hole.score, 0);
  const par = results.reduce((sum, hole) => sum + hole.par, 0);
  const putts = results.reduce((sum, hole) => sum + hole.putts, 0);
  const penalties = results.reduce((sum, hole) => sum + hole.penalties, 0);
  const fairways = results.filter((hole) => hole.fairwayHit !== undefined);
  const greens = results.filter((hole) => hole.greenHit !== undefined);
  const fairwaysPct = fairways.length ? fairways.filter((hole) => hole.fairwayHit).length / fairways.length : 0;
  const greensPct = greens.length ? greens.filter((hole) => hole.greenHit).length / greens.length : 0;
  const holeScores = results.map((hole) => hole.score - hole.par);
  const consistency = Math.max(0, 1 - standardDeviation(holeScores) / 2.5);
  const headline = penalties > 1 ? 'Penalty exposure was the clearest scoring leak.' : putts > results.length * 2 ? 'Putting volume was the clearest scoring opportunity.' : 'Scoring was driven by a mix of approach quality and consistency.';
  return { score, toPar: score - par, putts, penalties, fairwaysPct, greensPct, consistency, headline };
}

