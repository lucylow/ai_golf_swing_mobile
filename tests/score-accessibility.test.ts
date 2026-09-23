import { describe, expect, it } from "vitest";
import { clampScore, formatScoreAccessibilityLabel, scoreAccessibilityValue } from "../lib/score-accessibility";

describe("score accessibility", () => {
  it("clamps finite scores to the 0–100 range", () => {
    expect(clampScore(-4)).toBe(0);
    expect(clampScore(82.6)).toBe(83);
    expect(clampScore(140)).toBe(100);
    expect(clampScore(Number.NaN)).toBe(0);
  });

  it("formats a coherent score label and accessibility value", () => {
    expect(formatScoreAccessibilityLabel(82)).toBe("Swing score, 82 out of 100");
    expect(scoreAccessibilityValue(120)).toEqual({ min: 0, max: 100, now: 100 });
  });
});
