import { describe, expect, it } from "vitest";
import { canStartAnalysis, canUseFeature, defaultMonetizationState, shouldShowAds } from "../lib/monetization";

describe("monetization boundaries", () => {
  it("allows free analysis until the local limit", () => { expect(canStartAnalysis({ ...defaultMonetizationState, analysesUsedThisPeriod: 2 })).toBe(true); expect(canStartAnalysis({ ...defaultMonetizationState, analysesUsedThisPeriod: 3 })).toBe(false); });
  it("gates premium features and removes ads for premium tiers", () => { expect(canUseFeature(defaultMonetizationState, "proComparison")).toBe(false); const premium = { ...defaultMonetizationState, tier: "premium_yearly" as const, entitlements: ["premium" as const] }; expect(canUseFeature(premium, "proComparison")).toBe(true); expect(shouldShowAds(premium)).toBe(false); });
  it("keeps ads on the free tier", () => expect(shouldShowAds(defaultMonetizationState)).toBe(true));
});
