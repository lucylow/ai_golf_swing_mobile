import type { MonetizationState } from "@/lib/monetization";

export type MonetizationPreferenceKey = "promoCode" | "referral";
export function formatMonetizationPreference(state: Pick<MonetizationState, "promoCode" | "referral">, key: MonetizationPreferenceKey) { if (key === "promoCode") return state.promoCode ? `Promo: ${state.promoCode.code}` : "Promo"; return state.referral ? `Referral: ${state.referral.code}` : "Referral"; }
export function clearMonetizationPreference(state: Pick<MonetizationState, "promoCode" | "referral">, key: MonetizationPreferenceKey) { return { ...state, [key]: null }; }
