import { MasteryStateV8 } from './types';
export function nextDifficulty(state: MasteryStateV8): number {
  if (state.needsRegression) return Math.max(0.1, state.currentDifficulty - 0.12);
  if (state.readyForNextLevel) return Math.min(1, state.currentDifficulty + 0.12);
  return state.currentDifficulty;
}
export function expectedSuccess(state: MasteryStateV8, difficulty: number): number {
  const gap = difficulty - state.currentDifficulty;
  return Math.max(0.18, Math.min(0.96, state.recentScore + state.confidence * 0.18 - gap * 0.72));
}
