import { describe, expect, it } from "vitest";

import { filterDiagnostics, formatDiagnosticTimestamp, getDiagnosticAreas, getRuntimeIssueSummary, resolveDiagnosticArea, serializeDiagnosticsForClipboard, summarizeRuntimeLog } from "../lib/diagnostics";
import type { AppDiagnostic } from "../lib/error-reporting";

describe("diagnostics screen helpers", () => {
  it("formats valid diagnostic timestamps", () => {
    expect(formatDiagnosticTimestamp("2026-08-22T12:34:56.000Z")).not.toBe("Unknown time");
  });

  it("uses a safe fallback for malformed timestamps", () => {
    expect(formatDiagnosticTimestamp("not-a-date")).toBe("Unknown time");
  });

  it("returns a stable all option and sorted unique areas", () => {
    const items: AppDiagnostic[] = [
      { area: "media", errorType: "picker", timestamp: "1" },
      { area: "camera", errorType: "permission", timestamp: "2" },
      { area: "media", errorType: "timeout", timestamp: "3" },
    ];

    expect(getDiagnosticAreas(items)).toEqual(["all", "camera", "media"]);
  });

  it("filters diagnostics by area without mutating the source list", () => {
    const items: AppDiagnostic[] = [
      { area: "media", errorType: "picker", timestamp: "1" },
      { area: "camera", errorType: "permission", timestamp: "2" },
    ];

    expect(filterDiagnostics(items, "camera")).toEqual([items[1]]);
    expect(filterDiagnostics(items, "all")).toBe(items);
  });

  it("classifies known runtime messages without returning raw log content", () => {
    expect(summarizeRuntimeLog("Premature close at /bundler")).toMatchObject({ kind: "premature-close", owner: "development-server", title: "Premature request close" });
    expect(summarizeRuntimeLog("props.pointerEvents is deprecated")).toMatchObject({ kind: "deprecation", owner: "framework" });
    expect(summarizeRuntimeLog({ secret: "value" })).toMatchObject({ kind: "unknown", owner: "unknown" });
  });

  it("serializes only sanitized diagnostic fields for clipboard export", () => {
    const payload = serializeDiagnosticsForClipboard([{ area: "media", errorType: "picker", timestamp: "2026-08-23T12:00:00.000Z", secretToken: "should-not-appear" } as AppDiagnostic & { secretToken: string }]);
    expect(payload).toContain('"area": "media"');
    expect(payload).toContain('"errorType": "picker"');
    expect(payload).not.toContain("secretToken");
  });

  it("finds the first known runtime issue in sanitized diagnostics", () => {
    expect(getRuntimeIssueSummary([{ area: "server", errorType: "premature close", timestamp: "1" }])).toMatchObject({ kind: "premature-close" });
    expect(getRuntimeIssueSummary([{ area: "camera", errorType: "permission", timestamp: "1" }])).toBeNull();
  });

  it("preserves an existing area and falls back when it disappears", () => {
    const items: AppDiagnostic[] = [{ area: "camera", errorType: "permission", timestamp: "1" }];

    expect(resolveDiagnosticArea("camera", items)).toBe("camera");
    expect(resolveDiagnosticArea("media", items)).toBe("all");
  });
});
