import { ClubProfile } from '../types';
import { buildClubGaps } from './clubGapping';
export type ClubRecommendation = { clubId: string; name: string; expectedCarry: number; windAdjustedCarry: number; reason: string; risk: number };
export function recommendClub(targetYards: number, windAdjustedDistance: number, clubs: ClubProfile[]): ClubRecommendation[] {
  return clubs.map((club) => {
    const carryError = Math.abs(club.carryMeanYards - targetYards);
    const windError = Math.abs(club.carryMeanYards - windAdjustedDistance);
    const risk = Math.min(1, carryError / Math.max(20, targetYards) + 0.2 * (club.category === 'driver' && targetYards < 220 ? 1 : 0));
    const reason = windError < carryError ? 'Wind-adjusted number is closer to the club window.' : 'Raw carry window is the closest match.';
    return { clubId: club.id, name: club.name, expectedCarry: club.carryMeanYards, windAdjustedCarry: windAdjustedDistance, reason, risk };
  }).sort((a, b) => (a.risk - b.risk));
}

