import { describe, expect, it, vi } from "vitest";
import { safelyRemoveSubscription } from "../lib/safe-subscription";

describe("safe subscription cleanup", () => {
  it("removes an available subscription", () => {
    const remove = vi.fn();
    safelyRemoveSubscription({ remove });
    expect(remove).toHaveBeenCalledOnce();
  });

  it("reports cleanup failures without throwing", () => {
    const error = new Error("remove failed");
    const onError = vi.fn();
    expect(() => safelyRemoveSubscription({ remove: () => { throw error; } }, onError)).not.toThrow();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("does not let a reporter failure interrupt cleanup", () => {
    expect(() => safelyRemoveSubscription({ remove: () => { throw new Error("remove failed"); } }, () => { throw new Error("report failed"); })).not.toThrow();
  });
});
