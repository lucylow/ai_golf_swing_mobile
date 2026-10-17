import { CoachingInsight } from '../types';
export function sanitizeInsight(insight: CoachingInsight): CoachingInsight {
  const banned = ['guaranteed','perfect','100%','medical diagnosis'];
  const safe = (value: string) => banned.reduce((text, token)=>text.replace(new RegExp(token,'gi'),'').replace(/\s{2,}/g,' ').trim(), value);
  return { ...insight, title: safe(insight.title), observation: safe(insight.observation), whyItMatters: safe(insight.whyItMatters), nextAction: safe(insight.nextAction), evidence: insight.evidence.map(safe) };
}

