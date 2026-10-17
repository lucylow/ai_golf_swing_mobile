import { MasteryStateV8, SkillEvidence } from '../types';
import { updateMasteryV8 } from '../mastery';
import { evidenceSignal } from '../evidence';
import { nextDifficulty, expectedSuccess } from '../difficulty';
import { buildRegressionPlan } from '../regression';
import { buildPromotionPlan } from '../promotion';

export type ProgressionScenarioResult24 = {
  skill: MasteryStateV8['skill'];
  masteryBefore: number;
  masteryAfter: number;
  difficultyBefore: number;
  difficultyAfter: number;
  readiness: number;
  progression: 'advance' | 'maintain' | 'regress';
  loadNote: string;
};

const SKILL: MasteryStateV8['skill'] = 'putting-start-line';
const CASE_FACTOR = 0.870;

export function scoreProgressionEvidence24(evidence: readonly SkillEvidence[]): number {
  const relevant = evidence.filter((e) => e.skill === SKILL);
  if (!relevant.length) return 0;
  return relevant.reduce((sum, item) => sum + evidenceSignal(item), 0) / relevant.length;
}

export function runProgressionCase24(state: MasteryStateV8, evidence: readonly SkillEvidence[], nowMs: number): ProgressionScenarioResult24 {
  const filtered = evidence.filter((e) => e.skill === SKILL).map((e) => ({ ...e, difficulty: Math.max(0.05, Math.min(1, e.difficulty * CASE_FACTOR)) }));
  const updated = updateMasteryV8(state, filtered, nowMs);
  const before = nextDifficulty(state);
  const after = nextDifficulty(updated);
  const promotion = buildPromotionPlan(updated);
  const regression = buildRegressionPlan(updated);
  const progression: ProgressionScenarioResult24['progression'] = updated.needsRegression ? 'regress' : updated.readyForNextLevel ? 'advance' : 'maintain';
  const readiness = expectedSuccess(updated, after);
  const loadNote = progression === 'advance' ? promotion.reason : progression === 'regress' ? regression.reason : 'Maintain the current drill and stabilize repeatability.';
  return { skill: SKILL, masteryBefore: state.mastery, masteryAfter: updated.mastery, difficultyBefore: before, difficultyAfter: after, readiness, progression, loadNote };
}
