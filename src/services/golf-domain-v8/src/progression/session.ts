import { DrillDefinitionV8, SkillEvidence } from './types';
export type DrillAttempt = { drillId: string; stepId: string; reps: number; successful: number; averageQuality: number; timestampMs: number; context: SkillEvidence['context'] };
export function attemptsToEvidence(drill: DrillDefinitionV8, attempts: readonly DrillAttempt[]): SkillEvidence[] {
  const out: SkillEvidence[] = [];
  for (const attempt of attempts) {
    const rate = attempt.reps ? attempt.successful / attempt.reps : 0;
    out.push({ id: `${attempt.drillId}-${attempt.stepId}-${attempt.timestampMs}`, skill: drill.skill, timestampMs: attempt.timestampMs, kind: rate >= 0.75 ? 'successful-rep' : 'failed-rep', quality: attempt.averageQuality, difficulty: drill.difficulty, context: attempt.context });
  }
  return out;
}
