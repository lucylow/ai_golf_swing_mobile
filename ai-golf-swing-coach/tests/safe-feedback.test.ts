import { describe, expect, it, vi } from "vitest";
import { runSafely } from "../lib/safe-feedback";

describe("safe async actions", () => {
  it("resolves after a successful action", async () => {
    const action = vi.fn();
    await expect(runSafely(action)).resolves.toBeUndefined();
    expect(action).toHaveBeenCalledOnce();
  });

  it("reports rejected actions without leaking a rejection", async () => {
    const error = new Error("action failed");
    const onError = vi.fn();
    await expect(runSafely(async () => { throw error; }, onError)).resolves.toBeUndefined();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("keeps reporter failures from escaping", async () => {
    await expect(runSafely(() => { throw new Error("action failed"); }, () => { throw new Error("report failed"); })).resolves.toBeUndefined();
  });
});
