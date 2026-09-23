import { describe, expect, it } from "vitest";
import { motionDuration, tabPressScale } from "../lib/motion";

describe("motionDuration", () => {
  it("disables motion when reduced motion is enabled", () => {
    expect(motionDuration(280, true)).toBe(0);
  });

  it("preserves positive durations when motion is allowed", () => {
    expect(motionDuration(280, false)).toBe(280);
  });

  it("clamps invalid negative durations safely", () => {
    expect(motionDuration(-40, false)).toBe(0);
  });

  it("uses a gentle press scale only when motion is allowed", () => {
    expect(tabPressScale(true, false)).toBe(0.96);
    expect(tabPressScale(false, false)).toBe(1);
    expect(tabPressScale(true, true)).toBe(1);
  });
});
