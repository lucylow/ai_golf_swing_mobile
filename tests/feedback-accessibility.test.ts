import { describe, expect, it } from "vitest";
import { feedbackLiveRegion } from "../lib/feedback-accessibility";

describe("feedbackLiveRegion", () => {
  it("announces errors assertively", () => {
    expect(feedbackLiveRegion("error")).toBe("assertive");
  });

  it("keeps success and informational feedback polite", () => {
    expect(feedbackLiveRegion("success")).toBe("polite");
    expect(feedbackLiveRegion("info")).toBe("polite");
  });
});
