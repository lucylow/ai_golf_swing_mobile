import { describe, expect, it } from "vitest";
import { formatRewardHistoryDate, formatRewardHistoryMetadata, formatRewardHistoryTimestamp, getRewardsHistory } from "../lib/rewards-history";

const events = [
  { id: "analysis", name: "analysis_credit_used" as const, createdAt: "2026-08-21T00:00:00Z" },
  { id: "promo", name: "promo_applied" as const, createdAt: "2026-08-20T00:00:00Z" },
  { id: "referral", name: "referral_recorded" as const, createdAt: "2026-08-19T00:00:00Z" },
  { id: "credits", name: "analysis_credit_added" as const, createdAt: "2026-08-18T00:00:00Z" },
];

describe("rewards history", () => {
  it("filters unrelated analytics and returns newest rewards first", () => { expect(getRewardsHistory(events, 2)).toMatchObject([{ id: "credits", label: "Analysis credits added", kind: "credits", createdAt: "2026-08-18T00:00:00Z" }, { id: "referral", label: "Referral linked", kind: "referral", createdAt: "2026-08-19T00:00:00Z" }]); });
  it("formats valid and invalid dates safely", () => { expect(formatRewardHistoryDate("2026-08-21T00:00:00Z")).toBe("2026-08-21"); expect(formatRewardHistoryDate("invalid")).toBe("Recently"); });
  it("formats exact timestamps and stable metadata details", () => { expect(formatRewardHistoryTimestamp("2026-08-21T14:30:00.000Z")).toBe("2026-08-21 14:30:00 UTC"); expect(formatRewardHistoryTimestamp("invalid")).toBe("Timestamp unavailable"); expect(formatRewardHistoryMetadata({ source: "invite", code: "FAIRWAY", amount: 2 })).toEqual(["amount: 2", "code: FAIRWAY", "source: invite"]); });
});
