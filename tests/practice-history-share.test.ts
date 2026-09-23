import { beforeEach, describe, expect, it, vi } from "vitest";

const sharing = vi.hoisted(() => ({
  isAvailableAsync: vi.fn(),
  shareAsync: vi.fn(),
}));
const fileSystem = vi.hoisted(() => ({
  cacheDirectory: "file:///cache/",
  documentDirectory: "file:///documents/",
  EncodingType: { UTF8: "utf8" },
  writeAsStringAsync: vi.fn(),
}));

vi.mock("expo-sharing", () => sharing);
vi.mock("expo-file-system/legacy", () => fileSystem);
vi.mock("react-native", () => ({ Platform: { OS: "ios" } }));

import {
  practiceHistoryShareButtonLabel,
  practiceHistoryShareDisabled,
  sharePracticeHistorySummary,
  shouldShowPracticeHistoryShare,
  shouldUsePracticeHistoryClipboardFallback,
} from "../lib/practice-history-share";
import { clearRecentDiagnostics, getRecentDiagnostics } from "../lib/error-reporting";

describe("Practice History sharing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearRecentDiagnostics();
    sharing.isAvailableAsync.mockResolvedValue(true);
    sharing.shareAsync.mockResolvedValue(undefined);
    fileSystem.writeAsStringAsync.mockResolvedValue(undefined);
  });

  it("writes a sanitized text file and opens the native share sheet", async () => {
    const result = await sharePracticeHistorySummary("AI Golf Swing Coach\nPractice history\nWall Drill — 2026-08-23T12:00:00.000Z");
    expect(result).toEqual({
      shared: true,
      usedFallback: false,
      message: "Practice history is ready in the share sheet.",
    });
    expect(fileSystem.writeAsStringAsync).toHaveBeenCalledWith(
      expect.stringMatching(/^file:\/\/\/cache\/ai-golf-swing-coach-practice-history-\d+\.txt$/),
      expect.stringContaining("Wall Drill"),
      { encoding: "utf8" },
    );
    expect(sharing.shareAsync).toHaveBeenCalledWith(expect.any(String), {
      dialogTitle: "Share practice history",
      mimeType: "text/plain",
    });
  });

  it("returns a fallback when the share sheet is unavailable", async () => {
    sharing.isAvailableAsync.mockResolvedValue(false);
    await expect(sharePracticeHistorySummary("Practice history")).resolves.toMatchObject({
      shared: false,
      usedFallback: true,
      message: "Sharing is unavailable here. Use Copy instead.",
    });
    expect(sharing.shareAsync).not.toHaveBeenCalled();
    expect(shouldUsePracticeHistoryClipboardFallback({ shared: false, usedFallback: true, message: "unavailable" })).toBe(true);
  });

  it("sanitizes failures and records only the diagnostics area", async () => {
    fileSystem.writeAsStringAsync.mockRejectedValue(new Error("private disk path"));
    const result = await sharePracticeHistorySummary("Practice history");
    expect(result.message).toBe("Could not share practice history. Use Copy to try again.");
    expect(getRecentDiagnostics()).toMatchObject([{ area: "share-practice-history", errorType: "Error" }]);
    expect(JSON.stringify(getRecentDiagnostics())).not.toContain("private disk path");
  });

  it("keeps platform controls and busy labels deterministic", () => {
    expect(shouldShowPracticeHistoryShare("ios")).toBe(true);
    expect(shouldShowPracticeHistoryShare("android")).toBe(true);
    expect(shouldShowPracticeHistoryShare("web")).toBe(false);
    expect(shouldUsePracticeHistoryClipboardFallback({ shared: true, usedFallback: false, message: "shared" })).toBe(false);
    expect(practiceHistoryShareDisabled(true, false)).toBe(false);
    expect(practiceHistoryShareDisabled(false, false)).toBe(true);
    expect(practiceHistoryShareDisabled(true, true)).toBe(true);
    expect(practiceHistoryShareButtonLabel(false)).toBe("Share practice history");
    expect(practiceHistoryShareButtonLabel(true)).toBe("Sharing practice history");
  });
});
