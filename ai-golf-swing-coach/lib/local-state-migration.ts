type StateRecord = Record<string, unknown>;

function isRecord(value: unknown): value is StateRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merges persisted state with the current schema defaults without allowing
 * malformed legacy collections or partial profile objects to poison hydration.
 */
export function normalizeStoredState<T extends StateRecord>(saved: unknown, defaults: T): T {
  if (!isRecord(saved)) return defaults;

  const merged: StateRecord = { ...defaults, ...saved };
  const defaultProfile = defaults.profile;
  const savedProfile = saved.profile;
  if (isRecord(defaultProfile)) {
    merged.profile = {
      ...defaultProfile,
      ...(isRecord(savedProfile) ? savedProfile : {}),
    };
  }

  if ("sessions" in defaults) {
    merged.sessions = Array.isArray(saved.sessions)
      ? saved.sessions.filter((item) => isRecord(item) && typeof item.id === "string" && item.id.trim().length > 0)
      : defaults.sessions;
  }

  if (isRecord(defaults.activeGoal)) {
    const savedGoal = isRecord(saved.activeGoal) ? saved.activeGoal : {};
    merged.activeGoal = {
      ...defaults.activeGoal,
      ...savedGoal,
      metric: typeof savedGoal.metric === "string" && savedGoal.metric.trim().length > 0 ? savedGoal.metric : defaults.activeGoal.metric,
      target: typeof savedGoal.target === "number" && Number.isFinite(savedGoal.target) ? savedGoal.target : defaults.activeGoal.target,
      current: typeof savedGoal.current === "number" && Number.isFinite(savedGoal.current) ? savedGoal.current : defaults.activeGoal.current,
      deadline: typeof savedGoal.deadline === "string" && savedGoal.deadline.trim().length > 0 ? savedGoal.deadline : defaults.activeGoal.deadline,
    };
  }

  if ("completedDrills" in defaults) {
    merged.completedDrills = Array.isArray(saved.completedDrills)
      ? saved.completedDrills.filter((item): item is string => typeof item === "string")
      : defaults.completedDrills;
  }

  if ("lastPracticedDrills" in defaults) {
    const savedPractice = isRecord(saved.lastPracticedDrills) ? saved.lastPracticedDrills : {};
    const normalizedPractice: Record<string, string> = {};
    for (const [drillId, timestamp] of Object.entries(savedPractice)) {
      if (typeof drillId !== "string" || drillId.trim().length === 0 || typeof timestamp !== "string") continue;
      const parsed = Date.parse(timestamp);
      if (Number.isFinite(parsed)) normalizedPractice[drillId] = new Date(parsed).toISOString();
    }
    merged.lastPracticedDrills = normalizedPractice;
  }

  if ("completedDrillSteps" in defaults) {
    const savedSteps = isRecord(saved.completedDrillSteps) ? saved.completedDrillSteps : {};
    const normalizedSteps: Record<string, number[]> = {};
    for (const [drillId, value] of Object.entries(savedSteps)) {
      if (typeof drillId !== "string" || !Array.isArray(value)) continue;
      const indexes = value.filter((item): item is number => Number.isInteger(item) && item >= 0);
      if (indexes.length) normalizedSteps[drillId] = [...new Set(indexes)].sort((a, b) => a - b);
    }
    merged.completedDrillSteps = normalizedSteps;
  }

  return merged as T;
}
