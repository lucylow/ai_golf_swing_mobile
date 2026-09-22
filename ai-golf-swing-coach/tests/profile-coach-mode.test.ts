import { describe, expect, it } from "vitest";
import { formatProfileCoachMode, nextProfileCoachMode } from "../lib/profile-coach-mode";

describe("profile coach mode", () => {
  it("cycles through Explore, Focus, and Coach", () => {
    expect(nextProfileCoachMode("explore")).toBe("focus");
    expect(nextProfileCoachMode("focus")).toBe("coach");
    expect(nextProfileCoachMode("coach")).toBe("explore");
  });

  it("falls back to Explore for an unknown mode", () => {
    expect(nextProfileCoachMode("unknown")).toBe("explore");
  });

  it("formats modes for the Profile row", () => {
    expect(formatProfileCoachMode("explore")).toBe("Explore");
    expect(formatProfileCoachMode("focus")).toBe("Focus");
    expect(formatProfileCoachMode("coach")).toBe("Coach");
  });
});
