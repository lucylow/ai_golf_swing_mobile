import { describe, expect, it } from "vitest";
import { formatProfileUnits, nextProfileUnits } from "../lib/profile-units";

describe("profile units", () => {
  it("cycles between imperial and metric", () => {
    expect(nextProfileUnits("imperial")).toBe("metric");
    expect(nextProfileUnits("metric")).toBe("imperial");
  });

  it("formats units for the Profile row", () => {
    expect(formatProfileUnits("imperial")).toBe("Imperial");
    expect(formatProfileUnits("metric")).toBe("Metric");
  });
});
