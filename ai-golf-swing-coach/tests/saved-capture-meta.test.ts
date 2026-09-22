import { describe, expect, it } from "vitest";
import { formatSavedCaptureMeta, formatShareSummary } from "../lib/capture-review-meta";

describe("saved capture metadata", () => {
  it("formats native slow-motion sessions with persisted duration", () => { expect(formatSavedCaptureMeta({ videoUri: "file:///swing.mov", captureMode: "native", duration: "00:20", slowMotion: true })).toBe("Native video ready · 00:20 · Slow-mo"); });
  it("formats simulated sessions and supports legacy records", () => { expect(formatSavedCaptureMeta({ videoUri: "simulated://captured-swing", captureMode: "simulated", duration: "00:12" })).toBe("Preview capture ready · 00:12"); expect(formatSavedCaptureMeta({ duration: "00:04" })).toBe("Preview capture · 00:04"); });
  it("prefers persisted media source metadata over an unresolved legacy URI", () => { expect(formatSavedCaptureMeta({ videoUri: "ph://legacy-asset", captureMode: "simulated", mediaSource: "uploaded-preview", duration: "00:18" })).toBe("Uploaded preview ready · 00:18"); });
  it("includes capture context in shared report summaries", () => { expect(formatShareSummary({ club: "Driver", score: 79, session: { videoUri: "file:///driver.mov", captureMode: "native", duration: "00:20", slowMotion: true } })).toBe("AI Golf Swing Coach · Driver · Score 79/100 · Native video ready · 00:20 · Slow-mo"); });
});
