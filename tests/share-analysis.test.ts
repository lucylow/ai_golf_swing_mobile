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

import { shareAnalysisSummary } from "../lib/share-analysis";
import { clearRecentDiagnostics, getRecentDiagnostics } from "../lib/error-reporting";

describe("shareAnalysisSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearRecentDiagnostics();
    sharing.isAvailableAsync.mockResolvedValue(true);
    sharing.shareAsync.mockResolvedValue(undefined);
    fileSystem.writeAsStringAsync.mockResolvedValue(undefined);
  });

  it("writes a local text report and opens the native share sheet", async () => {
    const result = await shareAnalysisSummary("Swing score: 82");
    expect(result.shared).toBe(true);
    expect(fileSystem.writeAsStringAsync).toHaveBeenCalledWith(
      expect.stringMatching(/^file:\/\/\/cache\/ai-golf-swing-coach-report-\d+\.txt$/),
      "Swing score: 82",
      { encoding: "utf8" },
    );
    expect(sharing.shareAsync).toHaveBeenCalledWith(expect.any(String), {
      dialogTitle: "Save swing report",
      mimeType: "text/plain",
    });
  });

  it("returns recovery feedback when file preparation fails", async () => {
    fileSystem.writeAsStringAsync.mockRejectedValue(new Error("disk full"));
    const result = await shareAnalysisSummary("Swing score: 82");
    expect(result.shared).toBe(false);
    expect(result.message).toBe("Could not prepare the share sheet. Try again.");
    expect(getRecentDiagnostics()).toMatchObject([{ area: "share-analysis", errorType: "Error" }]);
  });
});
