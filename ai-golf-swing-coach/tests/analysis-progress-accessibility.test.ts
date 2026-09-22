import { describe, expect, it } from "vitest";
import { analysisProgressAccessibilityLabel } from "../lib/analysis-progress-accessibility";

describe("analysisProgressAccessibilityLabel", () => {
  it("announces the current stage, percentage, and step", () => {
    expect(analysisProgressAccessibilityLabel("Checking tempo", 0.4, 2, 5)).toBe(
      "Checking tempo, 40% complete, step 2 of 5",
    );
  });

  it("clamps progress before announcing it", () => {
    expect(analysisProgressAccessibilityLabel("Complete", 1.5, 5, 5)).toBe(
      "Complete, 100% complete, step 5 of 5",
    );
    expect(analysisProgressAccessibilityLabel("Starting", -1, 1, 5)).toBe(
      "Starting, 0% complete, step 1 of 5",
    );
  });
});
