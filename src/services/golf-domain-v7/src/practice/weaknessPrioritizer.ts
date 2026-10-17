import { CoachingInsight, PracticeSkill } from '../types';
import { clamp } from '../math/statistics';
export type Weakness = { skill: PracticeSkill; score: number; reason: string };
export function prioritizeWeaknesses(insights: CoachingInsight[]): Weakness[] {
  const weights: Partial<Record<CoachingInsight['domain'], number>> = { swing: 1, 'ball-flight': 0.9, equipment: 0.55, strategy: 0.8, 'short-game': 0.85, putting: 0.9 };
  const buckets = new Map<PracticeSkill, number>();
  for (const insight of insights) {
    const base = (weights[insight.domain] ?? 0.6) * (insight.priority === 'primary' ? 1 : insight.priority === 'secondary' ? 0.72 : 0.45) * insight.confidence;
    const skill: PracticeSkill = inferSkill(insight.title, insight.domain);
    buckets.set(skill, (buckets.get(skill) ?? 0) + base);
  }
  return [...buckets.entries()].map(([skill, score]) => ({ skill, score: clamp(score, 0, 2), reason: `Repeated evidence across ${skill} signals.` })).sort((a, b) => b.score - a.score);
}

function inferSkill(title: string, domain: CoachingInsight['domain']): PracticeSkill {
  const text = title.toLowerCase();
  if (domain === 'putting') return 'putting';
  if (domain === 'short-game') return text.includes('sand') ? 'short-game' : 'wedges';
  if (text.includes('face')) return 'face-control';
  if (text.includes('path')) return 'path-control';
  if (text.includes('tempo')) return 'tempo';
  if (text.includes('sequence') || text.includes('transition')) return 'sequencing';
  if (domain === 'strategy') return 'course-management';
  return 'contact';
}

