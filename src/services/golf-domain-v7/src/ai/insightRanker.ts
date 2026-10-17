import { CoachingInsight } from '../types';
export function rankInsights(insights: CoachingInsight[]): CoachingInsight[] {
  const weight = { primary: 1, secondary: 0.72, supporting: 0.42 } as const;
  return [...insights].sort((a, b) => weight[b.priority] * b.confidence - weight[a.priority] * a.confidence);
}

