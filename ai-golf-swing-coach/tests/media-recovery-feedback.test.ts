import { describe, expect, it } from "vitest";
import { formatCaptureRecoveryMessage, formatPlaybackRecoveryMessage } from "../lib/media-recovery-feedback";

describe("media recovery feedback", () => {
  it("confirms when capture is ready", () => {
    expect(formatCaptureRecoveryMessage("success")).toBe("Swing capture ready for review");
  });

  it("explains a cancelled recording", () => {
    expect(formatCaptureRecoveryMessage("cancelled")).toBe("Recording cancelled");
  });

  it("guides the user after a capture error", () => {
    expect(formatCaptureRecoveryMessage("error")).toBe("Could not capture the swing. Check camera access and try again.");
  });

  it("confirms when playback is restored", () => {
    expect(formatPlaybackRecoveryMessage("ready")).toBe("Playback ready");
  });

  it("guides the user when a clip remains unavailable", () => {
    expect(formatPlaybackRecoveryMessage("still-unavailable")).toBe("Video is still unavailable; try another clip");
  });

  it("guides the user when media resolution throws", () => {
    expect(formatPlaybackRecoveryMessage("error")).toBe("Could not restore playback. Try another clip.");
  });
});
