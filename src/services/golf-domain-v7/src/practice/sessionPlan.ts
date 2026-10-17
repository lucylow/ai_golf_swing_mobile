import { PracticeBlock, PracticeSkill } from '../types';
import { buildPracticeBlocks } from './drillPlan';
export type SessionPlan = { durationMinutes: number; blocks: PracticeBlock[]; focus: string; successMetric: string };
export function buildSessionPlan(skills: PracticeSkill[], maxMinutes = 35): SessionPlan {
  const blocks = buildPracticeBlocks(skills);
  let used = 0;
  const selected: PracticeBlock[] = [];
  for (const block of blocks) {
    if (used + block.minutes <= maxMinutes) {
      selected.push(block);
      used += block.minutes;
    }
  }
  const focus = selected[0]?.title ?? 'Baseline swing capture';
  const successMetric = selected[0]?.passCondition ?? 'Collect three valid swings.';
  return { durationMinutes: used, blocks: selected, focus, successMetric };
}

