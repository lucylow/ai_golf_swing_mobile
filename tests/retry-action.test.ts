import { describe, expect, it, vi } from "vitest";
import { createSafeRetryAction, isCurrentRetryGeneration } from "../lib/retry-action";

describe("createSafeRetryAction", () => {
  it("runs the action while the owner is active", () => {
    const action = vi.fn();
    const retry = createSafeRetryAction(action, () => true);

    retry?.();

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("suppresses the action after the owner becomes inactive", () => {
    const action = vi.fn();
    let active = true;
    const retry = createSafeRetryAction(action, () => active);

    active = false;
    retry?.();

    expect(action).not.toHaveBeenCalled();
  });

  it("preserves the null state when no action exists", () => {
    expect(createSafeRetryAction(null)).toBeNull();
  });

  it("invalidates an older retry generation", () => {
    expect(isCurrentRetryGeneration(3, 4, true)).toBe(false);
    expect(isCurrentRetryGeneration(4, 4, true)).toBe(true);
    expect(isCurrentRetryGeneration(4, 4, false)).toBe(false);
  });
});
