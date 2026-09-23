import { describe, expect, it } from "vitest";
import { formatClearRewardMessage, formatRewardsSummary } from "../lib/rewards-summary";

describe("rewards summary", () => {
  it("describes linked rewards without exposing unrelated state", () => { expect(formatRewardsSummary({ promoCode: null, referral: null })).toBe("No rewards linked yet"); expect(formatRewardsSummary({ promoCode: { code: "A123", appliedAt: "now" }, referral: null })).toBe("1 promo reward linked locally"); expect(formatRewardsSummary({ promoCode: null, referral: { code: "B123", source: "invite", recordedAt: "now" } })).toBe("1 referral reward linked locally"); expect(formatRewardsSummary({ promoCode: { code: "A123", appliedAt: "now" }, referral: { code: "B123", source: "invite", recordedAt: "now" } })).toBe("2 rewards linked locally"); });
  it("distinguishes clear-action feedback", () => { expect(formatClearRewardMessage("promoCode")).toContain("Promo code"); expect(formatClearRewardMessage("referral")).toContain("Referral"); });
});
