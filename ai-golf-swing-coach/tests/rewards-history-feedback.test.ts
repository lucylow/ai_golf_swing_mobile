import { describe, expect, it } from "vitest";
import { formatClearRewardsHistoryMessage } from "../lib/rewards-history-feedback";

describe("rewards history feedback", () => {
  it("confirms local history clearing", () => {
    expect(formatClearRewardsHistoryMessage("success")).toBe("Rewards activity cleared locally.");
  });

  it("gives recovery guidance when clearing fails", () => {
    expect(formatClearRewardsHistoryMessage("error")).toBe("Could not clear rewards activity. Try again.");
  });
});
