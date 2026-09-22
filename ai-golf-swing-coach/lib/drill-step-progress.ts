export type CompletedDrillSteps = Record<string, number[]>;

export function addCompletedDrillStep(state: CompletedDrillSteps, drillId: string, stepIndex: number): CompletedDrillSteps {
  if (!drillId.trim() || !Number.isInteger(stepIndex) || stepIndex < 0) return state;
  const existing = state[drillId] ?? [];
  if (existing.includes(stepIndex)) return state;
  return { ...state, [drillId]: [...existing, stepIndex].sort((a, b) => a - b) };
}

export function resetCompletedDrillSteps(state: CompletedDrillSteps, drillId: string): CompletedDrillSteps {
  if (!drillId.trim() || !(drillId in state)) return state;
  const next = { ...state };
  delete next[drillId];
  return next;
}
