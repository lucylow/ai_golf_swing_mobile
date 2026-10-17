import { CoachingInsight } from '../types';
export function renderInsightText(insight: CoachingInsight): string {
  const evidence = insight.evidence.join(' ');
  return `${insight.observation} ${evidence} ${insight.whyItMatters} Next: ${insight.nextAction}`;
}
export function compactInsight(insight: CoachingInsight): { title: string; summary: string; action: string } {
  return { title: insight.title, summary: insight.observation, action: insight.nextAction };
}

