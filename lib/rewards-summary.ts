import type { MonetizationState } from "@/lib/monetization";

export function formatRewardsSummary(state: Pick<MonetizationState, "promoCode" | "referral">): string { if (state.promoCode && state.referral) return "2 rewards linked locally"; if (state.promoCode) return "1 promo reward linked locally"; if (state.referral) return "1 referral reward linked locally"; return "No rewards linked yet"; }
export function formatClearRewardMessage(key: "promoCode" | "referral"): string { return key === "promoCode" ? "Promo code removed from local rewards" : "Referral removed from local rewards"; }
