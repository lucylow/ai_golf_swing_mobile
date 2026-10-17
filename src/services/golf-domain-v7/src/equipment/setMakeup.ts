import { ClubProfile, ClubCategory } from '../types';
import { buildClubGaps } from './clubGapping';
export type SetMakeupResult = { keep: string[]; examine: string[]; missingDistanceWindows: number[]; notes: string[] };
export function evaluateSetMakeup(clubs: ClubProfile[]): SetMakeupResult {
  const carry = Object.fromEntries(clubs.map((club) => [club.id, club.carryMeanYards]));
  const gaps = buildClubGaps(clubs, carry);
  const keep = clubs.filter((club) => club.category !== 'driver' || club.carryMeanYards >= 220).map((club) => club.id);
  const examine = gaps.gaps.filter((gap) => gap.overlap > 0.5).map((gap) => gap.clubId);
  const missingDistanceWindows = gaps.gaps.filter((gap) => gap.gapFromPriorYards > 18).map((gap) => gap.gapFromPriorYards);
  return { keep, examine, missingDistanceWindows, notes: gaps.notes };
}
export function groupByCategory(clubs: ClubProfile[]): Record<ClubCategory, string[]> {
  return clubs.reduce((result, club) => {
    result[club.category] = result[club.category] ?? [];
    result[club.category].push(club.id);
    return result;
  }, {} as Record<ClubCategory, string[]>);
}

