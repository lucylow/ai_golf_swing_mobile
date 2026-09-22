import { beforeEach, describe, expect, it } from "vitest";
import { clearRecentDiagnostics, getRecentDiagnostics, reportAppError } from "../lib/error-reporting";

describe("error reporting", () => {
  beforeEach(() => clearRecentDiagnostics());

  it("records only a safe category and area", () => {
    reportAppError("analysis", new Error("Bearer private-token"));
    expect(getRecentDiagnostics()).toMatchObject([
      { area: "analysis", errorType: "Error" },
    ]);
    expect(JSON.stringify(getRecentDiagnostics())).not.toContain("private-token");
  });

  it("sanitizes whitespace, control characters, and oversized areas", () => {
    reportAppError("  analysis\n\u0000failure-" + "x".repeat(100), new Error("failure"));
    const area = getRecentDiagnostics()[0]?.area ?? "";
    expect(area).toBe("analysisfailure-" + "x".repeat(80 - "analysisfailure-".length));
    expect(area).not.toContain("\n");
  });

  it("keeps only the latest bounded diagnostics", () => {
    for (let index = 0; index < 25; index += 1) {
      reportAppError(`area-${index}`, new Error("failure"));
    }
    const recent = getRecentDiagnostics();
    expect(recent).toHaveLength(20);
    expect(recent[0]?.area).toBe("area-5");
    expect(recent.at(-1)?.area).toBe("area-24");
  });
});
