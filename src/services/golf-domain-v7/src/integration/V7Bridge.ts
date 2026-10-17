import { GolfCoachAnalysis, analyzeGolfSession } from '../ai/golfCoachV7';
import { GolfSession, GolferProfile } from '../types';
import { buildCoachContext } from '../ai/contextBuilder';
export type GolfDomainV7Result = GolfCoachAnalysis & { context: ReturnType<typeof buildCoachContext> };
export class GolfDomainV7Bridge {
  analyze(golfer: GolferProfile, session: GolfSession, recentSessions: GolfSession[] = []): GolfDomainV7Result {
    const context = buildCoachContext(golfer, session, recentSessions);
    const analysis = analyzeGolfSession(session);
    return { ...analysis, context };
  }
}

