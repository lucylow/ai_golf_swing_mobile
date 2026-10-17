import { CoachingInsight, PracticeSkill } from '../types';
import { prioritizeWeaknesses } from '../practice/weaknessPrioritizer';
import { buildSessionPlan } from '../practice/sessionPlan';
export type Recommendation = { headline: string; primarySkill: PracticeSkill; blocks: ReturnType<typeof buildSessionPlan>['blocks']; why: string };
export function buildRecommendation(insights: CoachingInsight[]): Recommendation {
  const weaknesses = prioritizeWeaknesses(insights);
  const primary = weaknesses[0]?.skill ?? 'tempo';
  const plan = buildSessionPlan([primary, weaknesses[1]?.skill ?? 'contact'], 28);
  return { headline: `Today's coaching focus: ${primary.replace(/-/g, ' ')}`, primarySkill: primary, blocks: plan.blocks, why: weaknesses[0]?.reason ?? 'Collect more evidence to prioritize your next session.' };
}

