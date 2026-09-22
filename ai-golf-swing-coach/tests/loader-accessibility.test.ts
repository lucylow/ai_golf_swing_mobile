import { describe, expect, it } from "vitest";
import { loaderAccessibilityLabel } from "../lib/loader-accessibility";

describe("loaderAccessibilityLabel", () => {
  it("preserves a meaningful loading message", () => {
    expect(loaderAccessibilityLabel("Analyzing swing")).toBe("Analyzing swing");
  });

  it("falls back when the message is blank", () => {
    expect(loaderAccessibilityLabel("   ")).toBe("Loading");
  });
});
