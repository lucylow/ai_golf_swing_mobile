import { ClubStrategyProfile } from './types';
export function buildStrategyProfile_5(club: ClubStrategyProfile): ClubStrategyProfile {
  const lateralScale = 1 + (5 % 5 - 2) * 0.015;
  return { ...club, dispersion: { ...club.dispersion, lateralStd: club.dispersion.lateralStd * lateralScale }, penaltyProbability: Math.max(0.005, club.penaltyProbability * (1 + (5 % 4) * 0.02)) };
}
