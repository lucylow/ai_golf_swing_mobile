import { describe, expect, it } from "vitest";
import { canConsumeAnalysisCredit, canStartAnalysis, clearRewardEvents, defaultMonetizationState, isValidPromoCode, normalizePromoCode } from "../lib/monetization";

describe("monetization operations", () => {
  it("validates and normalizes safe promo codes", () => { expect(isValidPromoCode("fairway_2026")).toBe(true); expect(normalizePromoCode(" fairway_2026 ")).toBe("FAIRWAY_2026"); expect(isValidPromoCode("bad code!")).toBe(false); });
  it("allows a purchased analysis credit after the free limit", () => { const state = { ...defaultMonetizationState, analysesUsedThisPeriod: 3, analysisCredits: 1 }; expect(canStartAnalysis(state)).toBe(true); expect(canConsumeAnalysisCredit(state)).toBe(true); });
  it("does not allow credits to be consumed by premium users", () => { const state = { ...defaultMonetizationState, tier: "premium_monthly" as const, analysesUsedThisPeriod: 8, analysisCredits: 2 }; expect(canConsumeAnalysisCredit(state)).toBe(false); });
  it("clears reward events without removing unrelated analytics", () => { const events = [{ id: "promo", name: "promo_applied" as const, createdAt: "2026-08-21T00:00:00Z" }, { id: "view", name: "paywall_viewed" as const, createdAt: "2026-08-21T00:01:00Z" }, { id: "credit", name: "analysis_credit_added" as const, createdAt: "2026-08-21T00:02:00Z" }]; expect(clearRewardEvents(events)).toEqual([events[1]]); });
});

import { createLocalSnapshot, mergeSubscriptionSnapshot } from "../lib/monetization-sync";

describe("subscription synchronization contract", () => {
  it("creates a local snapshot without choosing a billing provider", () => { const snapshot = createLocalSnapshot({ tier: "free", entitlements: [] }); expect(snapshot.source).toBe("local"); expect(snapshot.tier).toBe("free"); });
  it("merges store entitlements without duplicates", () => { const merged = mergeSubscriptionSnapshot({ tier: "free", entitlements: [] }, { tier: "premium_monthly", entitlements: ["premium", "premium"], source: "store", syncedAt: new Date().toISOString() }); expect(merged).toEqual({ tier: "premium_monthly", entitlements: ["premium"] }); });
});
