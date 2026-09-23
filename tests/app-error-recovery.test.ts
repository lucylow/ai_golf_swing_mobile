import { describe, expect, it } from "vitest";
import { appErrorRecovery, appErrorRecoveryAnnouncement, nextRecoveryKey } from "../lib/app-error-recovery";

describe("app error recovery", () => {
  it("keeps the fallback copy actionable and device-safe", () => {
    expect(appErrorRecovery.title).toBe("Something went wrong");
    expect(appErrorRecovery.message).toContain("saved swings");
    expect(appErrorRecovery.actionLabel).toContain("again");
  });

  it("combines title and recovery guidance into one announcement", () => {
    expect(appErrorRecoveryAnnouncement()).toBe(`${appErrorRecovery.title}. ${appErrorRecovery.message}`);
  });

  it("advances recovery keys and repairs invalid counters", () => {
    expect(nextRecoveryKey(3)).toBe(4);
    expect(nextRecoveryKey(Number.NaN)).toBe(1);
  });
});
