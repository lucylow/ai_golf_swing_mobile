import { describe, expect, it } from "vitest";
import { classifyMediaSource, getMediaRecoveryState, isPlayableMediaSource, mediaCaptureMode, mediaPlaybackRetryLabel, mediaReplacementCancellationMessage, mediaReplacementPickerLabel, mediaUploadCancellationMessage, mediaSourceLabel } from "../lib/media-source";

describe("media source contract", () => {
  it("recognizes native playable video URIs", () => { expect(classifyMediaSource("file:///swing.mov")).toBe("native-video"); expect(isPlayableMediaSource("content://swing")).toBe(true); expect(mediaCaptureMode("file:///swing.mov")).toBe("native"); });
  it("keeps local simulations non-playable and clearly labeled", () => { expect(classifyMediaSource("simulated://uploaded-swing")).toBe("uploaded-preview"); expect(mediaSourceLabel("simulated://uploaded-swing")).toBe("Uploaded preview ready"); expect(mediaCaptureMode("simulated://uploaded-swing")).toBe("simulated"); });
  it("marks unresolved iOS library URIs as unavailable for playback", () => { expect(classifyMediaSource("ph://asset-123")).toBe("unresolved-video"); expect(isPlayableMediaSource("ph://asset-123")).toBe(false); expect(mediaSourceLabel("ph://asset-123")).toBe("Playback unavailable"); expect(mediaCaptureMode("ph://asset-123")).toBe("simulated"); });
  it("provides stable retry labels for idle and busy states", () => { expect(mediaPlaybackRetryLabel(false)).toBe("Retry video playback resolution"); expect(mediaPlaybackRetryLabel(true)).toBe("Resolving video playback"); });
  it("models the select, retry, limit, and replacement recovery states", () => { expect(getMediaRecoveryState("file:///swing.mov", 0)).toBe("ready"); expect(getMediaRecoveryState("ph://asset-123", 0)).toBe("retryable"); expect(getMediaRecoveryState("ph://asset-123", 1, true)).toBe("retrying"); expect(getMediaRecoveryState("ph://asset-123", 3)).toBe("replacement"); });
  it("provides stable replacement-picker labels for idle and busy states", () => { expect(mediaReplacementPickerLabel(false)).toBe("Choose a different swing video"); expect(mediaReplacementPickerLabel(true)).toBe("Opening video library"); });
  it("keeps the current video when replacement selection is canceled", () => { expect(mediaReplacementCancellationMessage()).toBe("Replacement canceled; current video remains selected"); });
  it("provides useful feedback when the initial upload is canceled", () => { expect(mediaUploadCancellationMessage()).toBe("Upload canceled; you can choose a video whenever you are ready"); });
});
