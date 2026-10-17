import { DrillDefinitionV8, DrillRecommendationV8, MasteryStateV8, ProgressionProfileV8 } from './types';
import { DRILLS_V8, drillForSkill } from './drills';
import { expectedSuccess, nextDifficulty } from './difficulty';
export function buildNextDrillV8(profile: ProgressionProfileV8, skill: MasteryStateV8['skill'], candidates: readonly DrillDefinitionV8[] = DRILLS_V8): DrillRecommendationV8 {
  const state = profile.skills[skill] ?? { skill, mastery: 0.35, confidence: 0.25, fatigue: 0, streak: 0, currentDifficulty: 0.25, attempts: 0, successes: 0, recentScore: 0.4, recentVariance: 0.1, readyForNextLevel: false, needsRegression: true };
  const difficulty = nextDifficulty(state);
  const pool = candidates.filter((d) => d.skill === skill);
  const drill = pool.length ? pool.slice().sort((a, b) => Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty))[0] : drillForSkill(skill, difficulty);
  const transition = state.needsRegression ? 'regress' : state.readyForNextLevel ? 'advance' : state.attempts < 3 ? 'introduce' : 'maintain';
  const reason = transition === 'advance' ? 'Recent performance is stable enough for a harder variation.' : transition === 'regress' ? 'Recent evidence suggests reducing complexity will restore successful reps.' : transition === 'introduce' ? 'Build a baseline with a controlled first exposure.' : 'Repeat the current difficulty to stabilize the pattern.';
  return { drill, reason, progression: transition, expectedSuccess: expectedSuccess(state, drill.difficulty), confidence: Math.max(0.2, state.confidence) };
}
