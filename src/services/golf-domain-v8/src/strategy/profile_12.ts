import { ClubStrategyProfile } from './types';
export function buildStrategyProfile_12(club: ClubStrategyProfile): ClubStrategyProfile {
  const lateralScale = 1 + (12 % 5 - 2) * 0.015;
  return { ...club, dispersion: { ...club.dispersion, lateralStd: club.dispersion.lateralStd * lateralScale }, penaltyProbability: Math.max(0.005, club.penaltyProbability * (1 + (12 % 4) * 0.02)) };
}
