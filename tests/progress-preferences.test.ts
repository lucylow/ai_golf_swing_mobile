import { describe, expect, it } from "vitest";
import { clearProgressMetricPreference, formatProgressPreference, isProgressMetric, normalizeProgressMetric } from "../lib/progress-preferences";

describe("progress preferences", () => {
  it("accepts only supported metric identifiers", () => { expect(isProgressMetric("speed")).toBe(true); expect(isProgressMetric("distance")).toBe(false); });
  it("falls back safely for missing or legacy values", () => { expect(normalizeProgressMetric(undefined)).toBe("speed"); expect(normalizeProgressMetric("hipTurn")).toBe("hipTurn"); expect(normalizeProgressMetric("old-metric", "tempo")).toBe("tempo"); });
  it("resets a non-default metric to club speed", () => { expect(clearProgressMetricPreference()).toBe("speed"); expect(formatProgressPreference("hipTurn")).toBe("Hip rotation"); });
});
