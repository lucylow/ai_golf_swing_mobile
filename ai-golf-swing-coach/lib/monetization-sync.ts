import type { Entitlement, ProductTier } from "@/lib/monetization";

/** Provider-neutral contract; adapters may later implement RevenueCat, App Store, or Play Billing. */
export type SubscriptionSyncSnapshot = { tier: ProductTier; entitlements: Entitlement[]; source: "local" | "store" | "restore"; syncedAt: string };
export type MonetizationProviderAdapter = { getSnapshot: () => Promise<SubscriptionSyncSnapshot | null>; restorePurchases: () => Promise<SubscriptionSyncSnapshot | null>; subscribe?: (listener: (snapshot: SubscriptionSyncSnapshot) => void) => () => void };

export function mergeSubscriptionSnapshot(current: { tier: ProductTier; entitlements: Entitlement[] }, snapshot: SubscriptionSyncSnapshot | null) { if (!snapshot) return current; return { tier: snapshot.tier, entitlements: Array.from(new Set(snapshot.entitlements)) }; }

export function createLocalSnapshot(current: { tier: ProductTier; entitlements: Entitlement[] }): SubscriptionSyncSnapshot { return { ...current, source: "local", syncedAt: new Date().toISOString() }; }
