import { describe, expect, it } from "vitest";
import { selectionAccessibilityState } from "../lib/onboarding-selection";

describe("onboarding selection accessibility state", () => {
  it("marks the active option as selected", () => {
    expect(selectionAccessibilityState(true)).toEqual({ selected: true });
  });

  it("marks inactive options as not selected", () => {
    expect(selectionAccessibilityState(false)).toEqual({ selected: false });
  });
});
