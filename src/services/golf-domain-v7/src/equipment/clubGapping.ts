import { ClubGap, ClubProfile } from '../types';
import { mean, clamp } from '../math/statistics';

export type GapHealth = { gaps: ClubGap[]; meanGap: number; minGap: number; maxGap: number; overlapCount: number; missingWindowCount: number; notes: string[] };

export function buildClubGaps(clubs: ClubProfile[], observedCarryByClub: Record<string, number>): GapHealth {
  const ordered = [...clubs].sort((a, b) => a.loftDeg - b.loftDeg);
  const gaps: ClubGap[] = [];
  const notes: string[] = [];
  for (let index = 0; index < ordered.length; index += 1) {
    const club = ordered[index];
    const carry = observedCarryByClub[club.id] ?? club.carryMeanYards;
    const prior = index > 0 ? ordered[index - 1] : undefined;
    const priorCarry = prior ? (observedCarryByClub[prior.id] ?? prior.carryMeanYards) : carry;
    const gap = index > 0 ? priorCarry - carry : 0;
    const overlap = index > 0 ? clamp((12 - gap) / 12, 0, 1) : 0;
    const confidence = observedCarryByClub[club.id] ? 0.9 : 0.58;
    gaps.push({ clubId: club.id, carryYards: carry, totalYards: carry + Math.max(5, carry * 0.08), gapFromPriorYards: gap, overlap, confidence });
  }
  const meaningful = gaps.slice(1).map((gap) => gap.gapFromPriorYards);
  const overlapCount = gaps.filter((gap) => gap.overlap > 0.35).length;
  const missingWindowCount = meaningful.filter((gap) => gap < 7 || gap > 20).length;
  if (overlapCount) notes.push(`${overlapCount} club windows show meaningful carry overlap.`);
  if (missingWindowCount) notes.push(`${missingWindowCount} gaps fall outside a typical decision window.`);
  return {
    gaps,
    meanGap: mean(meaningful),
    minGap: meaningful.length ? Math.min(...meaningful) : 0,
    maxGap: meaningful.length ? Math.max(...meaningful) : 0,
    overlapCount,
    missingWindowCount,
    notes,
  };
}

