import { describe, expect, it } from "vitest";
import { emptyStateAccessibilityLabel } from "../lib/empty-state-accessibility";

describe("emptyStateAccessibilityLabel", () => {
  it("combines title and description into one announcement", () => {
    expect(emptyStateAccessibilityLabel("No swings", "Record a swing to get started.")).toBe(
      "No swings. Record a swing to get started.",
    );
  });

  it("provides a fallback when both values are blank", () => {
    expect(emptyStateAccessibilityLabel("  ", " ")).toBe("No content available");
  });
});
