import { ClubStrategyProfile } from './types';
export function buildStrategyProfile_21(club: ClubStrategyProfile): ClubStrategyProfile {
  const lateralScale = 1 + (21 % 5 - 2) * 0.015;
  return { ...club, dispersion: { ...club.dispersion, lateralStd: club.dispersion.lateralStd * lateralScale }, penaltyProbability: Math.max(0.005, club.penaltyProbability * (1 + (21 % 4) * 0.02)) };
}
