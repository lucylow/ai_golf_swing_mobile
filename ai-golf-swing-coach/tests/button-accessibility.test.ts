import { describe, expect, it } from "vitest";
import { buttonAccessibilityState } from "../lib/button-accessibility";

describe("buttonAccessibilityState", () => {
  it("marks loading buttons as busy and disabled", () => {
    expect(buttonAccessibilityState(false, true)).toEqual({ disabled: true, busy: true });
  });

  it("preserves an explicitly disabled state", () => {
    expect(buttonAccessibilityState(true, false)).toEqual({ disabled: true, busy: false });
  });

  it("keeps idle buttons enabled", () => {
    expect(buttonAccessibilityState(false, false)).toEqual({ disabled: false, busy: false });
  });
});
