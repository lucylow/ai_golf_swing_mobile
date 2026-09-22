import { describe, expect, it } from "vitest";
import { drillFallbackMessage, drillLibraryRoute, isKnownDrillId, recommendedDrillRoute, resolveDrillId } from "../lib/drill-route";

describe("drill routes", () => {
  it("opens the recommended step-through drill", () => {
    expect(recommendedDrillRoute()).toBe("/drill-detail?drillId=step-through");
  });

  it("keeps known drill identifiers stable", () => {
    expect(resolveDrillId("wall-to-wall-tempo")).toBe("wall-to-wall-tempo");
  });

  it("exposes stable fallback recovery copy and destination", () => {
    expect(drillFallbackMessage).toContain("default practice drill");
    expect(drillLibraryRoute).toBe("/(tabs)/library");
  });

  it("detects known and invalid identifiers", () => {
    expect(isKnownDrillId("step-through")).toBe(true);
    expect(isKnownDrillId("missing-drill")).toBe(false);
    expect(isKnownDrillId(undefined)).toBe(false);
  });

  it("falls back to the default drill for unknown identifiers", () => {
    expect(resolveDrillId("missing-drill")).toBe("step-through");
    expect(resolveDrillId(undefined)).toBe("step-through");
  });

  it("encodes custom drill identifiers safely", () => {
    expect(recommendedDrillRoute("tempo drill")).toBe("/drill-detail?drillId=tempo%20drill");
  });
});
