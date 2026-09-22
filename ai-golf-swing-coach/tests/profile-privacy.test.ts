import { describe, expect, it } from "vitest";
import { formatProfilePrivacy, nextProfilePrivacy } from "../lib/profile-privacy";

describe("profile privacy", () => {
  it("cycles between private and shared access", () => {
    expect(nextProfilePrivacy("private")).toBe("shared");
    expect(nextProfilePrivacy("shared")).toBe("private");
  });

  it("formats privacy choices for the Profile row", () => {
    expect(formatProfilePrivacy("private")).toBe("Only me");
    expect(formatProfilePrivacy("shared")).toBe("Shared with coaches");
  });
});
