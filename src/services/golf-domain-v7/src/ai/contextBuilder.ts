import { GolfSession, GolferProfile, ShotInput } from '../types';
export type CoachContext = { golfer: GolferProfile; session: GolfSession; recentMisses: string[]; recurringClubs: string[]; goals: string[] };
export function buildCoachContext(golfer: GolferProfile, session: GolfSession, recentSessions: GolfSession[]): CoachContext {
  const recentMisses = [...recentSessions.flatMap((item) => item.insights.filter((insight) => insight.priority !== 'supporting').map((insight) => insight.title))].slice(0, 8);
  const clubCounts = new Map<string, number>();
  for (const item of recentSessions.flatMap((entry) => entry.shots)) clubCounts.set(item.clubId, (clubCounts.get(item.clubId) ?? 0) + 1);
  const recurringClubs = [...clubCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([club]) => club);
  return { golfer, session, recentMisses, recurringClubs, goals: golfer.goals };
}

