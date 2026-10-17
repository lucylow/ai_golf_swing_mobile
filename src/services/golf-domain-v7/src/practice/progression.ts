import { clamp } from '../math/statistics';
export type ProgressionState = { level: 1 | 2 | 3 | 4; nextTarget: string; readiness: number; explanation: string };
export function chooseProgression(score: number, variability: number, reps: number): ProgressionState {
  const readiness = clamp(score * 0.72 + clamp(1 - variability, 0, 1) * 0.2 + clamp(reps / 40, 0, 1) * 0.08, 0, 1);
  const level = readiness > 0.85 ? 4 : readiness > 0.7 ? 3 : readiness > 0.5 ? 2 : 1;
  const nextTarget = level >= 4 ? 'Transfer the skill to random targets.' : level === 3 ? 'Increase speed while preserving the movement.' : level === 2 ? 'Reduce variability before adding speed.' : 'Build a consistent baseline pattern.';
  return { level, nextTarget, readiness, explanation: 'Progression increases challenge only when consistency supports it.' };
}

