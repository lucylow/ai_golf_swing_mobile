import { describe, expect, it } from "vitest";
import { nextCaptureReviewState } from "../lib/capture-review";

describe("capture review flow", () => {
  it("moves from recording to review to analysis", () => {
    expect(nextCaptureReviewState("ready", "start")).toBe("recording");
    expect(nextCaptureReviewState("recording", "stop")).toBe("review");
    expect(nextCaptureReviewState("review", "analyze")).toBe("analyzing");
  });
  it("supports a retake from review", () => expect(nextCaptureReviewState("review", "retake")).toBe("ready"));
});
