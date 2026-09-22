import { describe, expect, it } from "vitest";
import { actionButtonProgressLabel, normalizeActionProgress } from "../lib/action-button-progress";

describe("ActionButton progress helpers", () => {
  it("clamps finite progress values to the supported range", () => {
    expect(normalizeActionProgress(-0.2)).toBe(0);
    expect(normalizeActionProgress(0.42)).toBe(0.42);
    expect(normalizeActionProgress(1.4)).toBe(1);
  });

  it("ignores invalid progress values", () => {
    expect(normalizeActionProgress(undefined)).toBeUndefined();
    expect(normalizeActionProgress(Number.NaN)).toBeUndefined();
    expect(normalizeActionProgress(Number.POSITIVE_INFINITY)).toBeUndefined();
  });

  it("formats an accessible completion announcement", () => {
    expect(actionButtonProgressLabel("Analyzing swing", 0.675)).toBe("Analyzing swing, 68% complete");
    expect(actionButtonProgressLabel("Save report", undefined)).toBe("Save report");
  });
});
