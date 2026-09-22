import { describe, expect, it } from "vitest";
import { normalizeStoredState } from "../lib/local-state-migration";

describe("normalizeStoredState", () => {
  const defaults = {
    profile: { displayName: "Alex", coachMode: "explore", notifications: true },
    sessions: [{ id: "seed" }],
    activeGoal: { metric: "Club head speed", target: 100, current: 94, deadline: "September 30" },
    completedDrills: [],
    completedDrillSteps: {},
    preferredProgressMetric: "speed",
  };

  it("fills newly added profile fields from current defaults", () => {
    const result = normalizeStoredState({ profile: { displayName: "Sam" } }, defaults);
    expect(result.profile).toEqual({ displayName: "Sam", coachMode: "explore", notifications: true });
  });

  it("rejects malformed session collections and filters invalid drill ids", () => {
    const result = normalizeStoredState({ sessions: { old: true }, completedDrills: ["tempo", 4, null] }, defaults);
    expect(result.sessions).toEqual(defaults.sessions);
    expect(result.completedDrills).toEqual(["tempo"]);
  });

  it("normalizes persisted drill-step indexes and drops malformed values", () => {
    const result = normalizeStoredState({ completedDrillSteps: { "step-through": [2, 0, 2, -1, "1"], invalid: [null, 1.5] } }, defaults);
    expect(result.completedDrillSteps).toEqual({ "step-through": [0, 2] });
  });

  it("keeps valid sessions while removing malformed entries", () => {
    const valid = { id: "legacy-1", label: "Range session" };
    const result = normalizeStoredState({ sessions: [valid, null, { label: "missing id" }, { id: "  " }] }, defaults);
    expect(result.sessions).toEqual([valid]);
  });

  it("normalizes malformed active-goal values without losing valid fields", () => {
    const result = normalizeStoredState({ activeGoal: { metric: "Club head speed", target: "fast", current: 96, deadline: " " } }, defaults);
    expect(result.activeGoal).toEqual({ metric: "Club head speed", target: 100, current: 96, deadline: "September 30" });
  });

  it("returns defaults for non-object persisted data", () => {
    expect(normalizeStoredState(null, defaults)).toBe(defaults);
  });
});
