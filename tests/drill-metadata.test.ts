import { describe, expect, it } from "vitest";
import { colorContrastRatio, equipmentIconFor, hasAccessibleAccent, isValidDrillColor, normalizeDrillMetadata, type DrillMetadata } from "../lib/drill-metadata";

const fallback: DrillMetadata = { id: "step-through", title: "Step-through drill", description: "Fallback", time: "6 min", equipment: "No equipment", heroColor: "#1F6B4F", accentColor: "#F6C453", steps: ["Step one"] };

describe("drill metadata", () => {
  it("preserves valid metadata", () => {
    const value = { id: "tempo", title: "Tempo", description: "Practice rhythm", time: "4 min", equipment: "Wall space", heroColor: "#315D52", accentColor: "#F3C65B", steps: ["Count three to one"] };
    expect(normalizeDrillMetadata(value, fallback)).toEqual(value);
  });

  it("removes blank instructional steps", () => {
    const value = { id: "tempo", title: "Tempo", description: "Practice rhythm", time: "4 min", equipment: "Wall space", heroColor: "#315D52", accentColor: "#F3C65B", steps: ["Count three to one", " "] };
    expect(normalizeDrillMetadata(value, fallback).steps).toEqual(["Count three to one"]);
  });

  it("validates colors and contrast deterministically", () => {
    expect(isValidDrillColor("#1F6B4F")).toBe(true);
    expect(isValidDrillColor("#fff")).toBe(false);
    expect(colorContrastRatio("#1F6B4F", "#F6C453")).toBeGreaterThan(3);
    expect(hasAccessibleAccent("#1F6B4F", "#F6C453")).toBe(true);
    expect(hasAccessibleAccent("#FFFFFF", "#F8F8F8")).toBe(false);
  });

  it("selects stable equipment icons for known and future labels", () => {
    expect(equipmentIconFor("No equipment")).toBe("target");
    expect(equipmentIconFor("Wall space")).toBe("gearshape.fill");
    expect(equipmentIconFor("Club and ball")).toBe("gearshape.fill");
  });

  it("falls back to the safe accent when metadata contrast is too low", () => {
    const value = { id: "tempo", title: "Tempo", description: "Practice rhythm", time: "4 min", equipment: "Wall space", heroColor: "#315D52", accentColor: "#315D52", steps: ["Count three to one"] };
    expect(normalizeDrillMetadata(value, fallback).accentColor).toBe(fallback.accentColor);
  });

  it("falls back for malformed metadata", () => {
    expect(normalizeDrillMetadata({ id: "tempo", title: "Tempo" }, fallback)).toBe(fallback);
  });
});
