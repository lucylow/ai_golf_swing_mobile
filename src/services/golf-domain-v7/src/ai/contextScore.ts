import { clamp } from '../math/statistics';
export type ContextScore = { score: number; factors: Record<string,number>; note: string };
export function scoreContext(factors: {goalFit:number; historyFit:number; clubFit:number; sessionFit:number}): ContextScore {
  const score = clamp(factors.goalFit*.32 + factors.historyFit*.26 + factors.clubFit*.2 + factors.sessionFit*.22,0,1);
  return { score, factors, note: score>.78?'Strong context match.':score>.55?'Moderate context match.':'Weak context match; gather more evidence.' };
}

