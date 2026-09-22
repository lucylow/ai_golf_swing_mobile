import { describe, expect, it } from "vitest";

import { isSpacePreviewerMessage, isValidSafeAreaInsetsPayload } from "../lib/manus-runtime-recovery";

describe("Manus runtime recovery validation", () => {
  it("rejects null and malformed safe-area payloads", () => {
    expect(isValidSafeAreaInsetsPayload(null)).toBe(false);
    expect(isValidSafeAreaInsetsPayload({ top: 1, right: 1, bottom: 1 })).toBe(false);
    expect(isValidSafeAreaInsetsPayload({ top: 1, right: 2, bottom: 3, left: 4 })).toBe(true);
  });

  it("rejects untrusted message shapes before nested access", () => {
    expect(isSpacePreviewerMessage(null)).toBe(false);
    expect(isSpacePreviewerMessage({ type: "SpacePreviewerChannel", payload: null })).toBe(false);
    expect(
      isSpacePreviewerMessage({
        type: "SpacePreviewerChannel",
        payload: { type: "setSafeAreaInsets", from: "container", to: "content", payload: {} },
      }),
    ).toBe(true);
  });
});
