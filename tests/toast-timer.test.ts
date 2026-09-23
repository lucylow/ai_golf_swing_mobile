import { describe, expect, it, vi } from "vitest";
import { createToastDismissTimer } from "../lib/toast-timer";

describe("createToastDismissTimer", () => {
  it("schedules dismissal with the default delay", () => {
    const schedule = vi.fn((callback: () => void) => callback as unknown as ReturnType<typeof setTimeout>);
    const cancel = vi.fn();
    const onDismiss = vi.fn();

    createToastDismissTimer(onDismiss, 3600, schedule, cancel);

    expect(schedule).toHaveBeenCalledWith(expect.any(Function), 3600);
  });

  it("cancels a pending dismissal only once", () => {
    const handle = {} as ReturnType<typeof setTimeout>;
    const schedule = vi.fn(() => handle);
    const cancel = vi.fn();
    const stop = createToastDismissTimer(() => undefined, 3600, schedule, cancel);

    stop();
    stop();

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledWith(handle);
  });

  it("does not cancel after the timer callback has fired", () => {
    let callback: (() => void) | undefined;
    const handle = {} as ReturnType<typeof setTimeout>;
    const schedule = vi.fn((next: () => void) => {
      callback = next;
      return handle;
    });
    const cancel = vi.fn();
    const onDismiss = vi.fn();
    const stop = createToastDismissTimer(onDismiss, 120, schedule, cancel);

    callback?.();
    stop();

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(cancel).not.toHaveBeenCalled();
  });
});
