import { describe, expect, it } from "vitest";
import { clearMonetizationPreference, formatMonetizationPreference } from "../lib/monetization-preferences";

const state = { promoCode: { code: "FAIRWAY10", appliedAt: "2026-08-21T00:00:00Z" }, referral: { code: "FRIEND42", source: "invite" as const, recordedAt: "2026-08-21T00:00:00Z" } };

describe("monetization preferences", () => {
  it("formats applied promo and referral chips", () => { expect(formatMonetizationPreference(state, "promoCode")).toBe("Promo: FAIRWAY10"); expect(formatMonetizationPreference(state, "referral")).toBe("Referral: FRIEND42"); });
  it("clears one preference without changing the other", () => { expect(clearMonetizationPreference(state, "promoCode")).toEqual({ promoCode: null, referral: state.referral }); expect(clearMonetizationPreference(state, "referral")).toEqual({ promoCode: state.promoCode, referral: null }); });
});
