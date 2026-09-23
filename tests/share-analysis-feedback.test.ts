import { describe, expect, it } from "vitest";
import { formatShareAnalysisMessage } from "../lib/share-analysis-feedback";

describe("share analysis feedback", () => {
  it("explains when sharing is unavailable", () => {
    expect(formatShareAnalysisMessage("unavailable")).toBe("Sharing is not available on this device.");
  });

  it("offers retry guidance when preparing a share fails", () => {
    expect(formatShareAnalysisMessage("error")).toBe("Could not prepare the share sheet. Try again.");
  });
});
