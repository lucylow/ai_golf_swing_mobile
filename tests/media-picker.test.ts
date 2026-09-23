import { describe, expect, it } from "vitest";
import { createSimulatedUploadResult, formatPickedMediaMetadata, resolvePickedMediaUri } from "../lib/media-picker-contract";
import { classifyMediaSource, mediaCaptureMode } from "../lib/media-source";

describe("media picker", () => {
  it("returns a simulated upload on web without opening native UI", async () => {
    expect(createSimulatedUploadResult()).toEqual({ canceled: false, uri: "simulated://uploaded-swing", durationMillis: null, fileSizeBytes: null, assetId: null });
  });

  it("formats optional duration and file size metadata safely", () => { expect(formatPickedMediaMetadata(12500, 3 * 1024 * 1024)).toBe("13 sec · 3.0 MB"); expect(formatPickedMediaMetadata(null, null)).toBeNull(); expect(formatPickedMediaMetadata(-1, 0)).toBe("1 KB"); });

  it("keeps retry metadata stable when resolution does not change the URI", () => { expect(resolvePickedMediaUri("ph://asset-123")).toBe("ph://asset-123"); });

  it("resolves iOS ph URIs only when MediaLibrary provides a local URI", () => { expect(resolvePickedMediaUri("ph://asset-123", "file:///tmp/asset.mov")).toBe("file:///tmp/asset.mov"); expect(resolvePickedMediaUri("ph://asset-123")).toBe("ph://asset-123"); expect(resolvePickedMediaUri("file:///tmp/asset.mov", "file:///tmp/other.mov")).toBe("file:///tmp/asset.mov"); });

  it("classifies picked file URIs as native media", () => {
    expect(classifyMediaSource("file:///private/var/mobile/video.mov")).toBe("native-video");
    expect(mediaCaptureMode("file:///private/var/mobile/video.mov")).toBe("native");
  });
});
