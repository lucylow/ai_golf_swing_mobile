export type ProductTier = "free" | "premium_monthly" | "premium_yearly" | "premium_lifetime" | "coach_monthly" | "coach_yearly";
export type Entitlement = "premium" | "coach" | "ad_free";
export type PremiumFeature = "advancedMetrics" | "proComparison" | "unlimitedAnalyses" | "coachDrills";
export type MonetizationEventName = "paywall_viewed" | "upgrade_intent" | "analysis_limit_reached" | "purchase_restored" | "promo_applied" | "referral_recorded" | "analysis_credit_added" | "analysis_credit_used";

export type MonetizationEvent = { id: string; name: MonetizationEventName; createdAt: string; metadata?: Record<string, string | number | boolean> };
export type ReferralAttribution = { code: string; source: "invite" | "campaign" | "unknown"; recordedAt: string };
export type PromoCodeState = { code: string; appliedAt: string } | null;
export type MonetizationState = { tier: ProductTier; entitlements: Entitlement[]; analysesUsedThisPeriod: number; analysisCredits: number; events: MonetizationEvent[]; referral: ReferralAttribution | null; promoCode: PromoCodeState };
export type PaywallProduct = { id: ProductTier; title: string; description: string; priceLabel: string; badge?: string };

export const paywallProducts: PaywallProduct[] = [
  { id: "premium_monthly", title: "Premium monthly", description: "Advanced swing metrics and pro comparisons.", priceLabel: "Monthly", badge: "Flexible" },
  { id: "premium_yearly", title: "Premium yearly", description: "Everything in Premium with the best annual value.", priceLabel: "Annual", badge: "Best value" },
  { id: "premium_lifetime", title: "Premium lifetime", description: "One-time unlock for the Premium toolkit.", priceLabel: "One time" },
];

export const defaultMonetizationState: MonetizationState = { tier: "free", entitlements: [], analysesUsedThisPeriod: 0, analysisCredits: 0, events: [], referral: null, promoCode: null };
export const FREE_ANALYSIS_LIMIT = 3;

export function hasEntitlement(state: MonetizationState, entitlement: Entitlement) { return state.entitlements.includes(entitlement); }
export function isPremium(state: MonetizationState) { return state.tier !== "free" || hasEntitlement(state, "premium") || hasEntitlement(state, "coach"); }
export function canUseFeature(state: MonetizationState, feature: PremiumFeature) { if (feature === "advancedMetrics" || feature === "proComparison" || feature === "coachDrills" || feature === "unlimitedAnalyses") return isPremium(state); return true; }
export function canStartAnalysis(state: Pick<MonetizationState, "tier" | "entitlements" | "analysesUsedThisPeriod"> & Partial<Pick<MonetizationState, "analysisCredits">>) { return isPremium({ ...defaultMonetizationState, ...state }) || state.analysesUsedThisPeriod < FREE_ANALYSIS_LIMIT || (state.analysisCredits ?? 0) > 0; }
export function shouldShowAds(state: MonetizationState) { return !hasEntitlement(state, "ad_free") && !isPremium(state); }
export function isValidPromoCode(code: string) { return /^[A-Z0-9][A-Z0-9_-]{3,23}$/.test(code.trim().toUpperCase()); }
export function normalizePromoCode(code: string) { return code.trim().toUpperCase(); }
export function canConsumeAnalysisCredit(state: MonetizationState) { return !isPremium(state) && state.analysesUsedThisPeriod >= FREE_ANALYSIS_LIMIT && state.analysisCredits > 0; }
export function isRewardEventName(name: MonetizationEventName) { return name === "promo_applied" || name === "referral_recorded" || name === "analysis_credit_added"; }
export function clearRewardEvents(events: MonetizationEvent[]) { return events.filter((event) => !isRewardEventName(event.name)); }
