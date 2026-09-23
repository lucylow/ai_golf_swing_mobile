import { describe, expect, it } from "vitest";
import { addCompletedDrillStep, resetCompletedDrillSteps } from "../lib/drill-step-progress";

describe("drill step progress", () => {
  it("adds a step in sorted order without duplicates", () => {
    const current = { "step-through": [2] };
    expect(addCompletedDrillStep(current, "step-through", 0)).toEqual({ "step-through": [0, 2] });
    expect(addCompletedDrillStep(current, "step-through", 2)).toBe(current);
  });

  it("rejects invalid step writes without changing state", () => {
    const current = { "step-through": [0] };
    expect(addCompletedDrillStep(current, " ", 1)).toBe(current);
    expect(addCompletedDrillStep(current, "step-through", -1)).toBe(current);
  });

  it("resets only the requested drill and preserves other progress", () => {
    const current = { "step-through": [0, 1], tempo: [0] };
    expect(resetCompletedDrillSteps(current, "step-through")).toEqual({ tempo: [0] });
    expect(resetCompletedDrillSteps(current, "unknown")).toBe(current);
  });
});
