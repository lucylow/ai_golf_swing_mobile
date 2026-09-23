import { describe, expect, it } from "vitest";
import { canCompareSessions } from "../lib/compare-availability";

describe("compare availability", () => {
  it("requires two saved sessions", () => {
    expect(canCompareSessions(0)).toBe(false);
    expect(canCompareSessions(1)).toBe(false);
    expect(canCompareSessions(2)).toBe(true);
  });

  it("supports comparison with more than two saved sessions", () => {
    expect(canCompareSessions(5)).toBe(true);
  });
});
