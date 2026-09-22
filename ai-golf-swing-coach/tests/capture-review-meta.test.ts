import { describe, expect, it } from "vitest";
import { formatCaptureReviewMeta } from "../lib/capture-review-meta";

describe("capture review metadata", () => {
  it("includes source, club, duration, and slow-motion state", () => { expect(formatCaptureReviewMeta({ uri: "simulated://uploaded-swing", club: "Driver", duration: 20, slowMotion: true })).toBe("Uploaded preview ready · Driver · 20s · Slow-mo"); });
  it("keeps standard native captures concise", () => { expect(formatCaptureReviewMeta({ uri: "file:///swing.mov", club: "7 iron", duration: 12, slowMotion: false })).toBe("Native video ready · 7 iron · 12s"); });
});
