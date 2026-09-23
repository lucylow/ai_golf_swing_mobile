import { describe, expect, it } from "vitest";
import { nextProfileHandicap } from "../lib/profile-handicap";

describe("profile handicap", () => {
  it("cycles through supported handicap choices", () => {
    expect(nextProfileHandicap("8.2")).toBe("12.4");
    expect(nextProfileHandicap("12.4")).toBe("20+");
    expect(nextProfileHandicap("20+")).toBe("8.2");
  });

  it("falls back to the first option for an unknown value", () => {
    expect(nextProfileHandicap("unknown")).toBe("8.2");
  });
});
