import { describe, expect, it } from "vitest";
import { formatAnalysisCancellationMessage } from "../lib/analysis-recovery-feedback";

describe("analysis recovery feedback", () => {
  it("explains a user cancellation while preserving the capture", () => {
    expect(formatAnalysisCancellationMessage("user")).toBe("Analysis cancelled. Your captured swing is still available.");
  });

  it("explains an inactive-app interruption while preserving the capture", () => {
    expect(formatAnalysisCancellationMessage("lifecycle")).toBe("Analysis stopped when the app became inactive. Your captured swing is still available.");
  });
});
