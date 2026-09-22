import { describe, expect, it } from "vitest";
import { formatLastPracticedLabel, markDrillPracticed, normalizeLastPracticed } from "../lib/drill-practice-meta";

describe("drill practice metadata", () => {
  const now = Date.parse("2026-08-23T12:00:00.000Z");

  it("normalizes valid timestamps and drops malformed entries", () => {
    expect(normalizeLastPracticed({ drill: "2026-08-23T11:00:00-05:00", empty: "bad", "": "2026-08-23T11:00:00Z", numeric: 123 })).toEqual({ drill: "2026-08-23T16:00:00.000Z" });
  });

  it("formats stable relative labels with a safe future-date fallback", () => {
    expect(formatLastPracticedLabel("2026-08-23T11:59:30.000Z", now)).toBe("Practiced just now");
    expect(formatLastPracticedLabel("2026-08-23T11:45:00.000Z", now)).toBe("Practiced 15 min ago");
    expect(formatLastPracticedLabel("2026-08-22T12:00:00.000Z", now)).toBe("Practiced yesterday");
    expect(formatLastPracticedLabel("2026-08-24T12:00:00.000Z", now)).toBe("Not practiced yet");
    expect(formatLastPracticedLabel("invalid", now)).toBe("Not practiced yet");
  });

  it("marks only valid drill identifiers with canonical ISO timestamps", () => {
    expect(markDrillPracticed({}, "step-through", "2026-08-23T11:00:00-05:00")).toEqual({ "step-through": "2026-08-23T16:00:00.000Z" });
    expect(markDrillPracticed({}, "", "2026-08-23T11:00:00Z")).toEqual({});
  });
});
