import { describe, expect, it, vi } from "vitest";
import { runToastAction } from "../lib/toast-action";

describe("runToastAction", () => {
  it("runs the action before dismissing the toast", () => {
    const events: string[] = [];

    runToastAction(() => events.push("action"), () => events.push("hide"));

    expect(events).toEqual(["action", "hide"]);
  });

  it("dismisses the toast even when the action throws", () => {
    const onHide = vi.fn();

    expect(() => runToastAction(() => { throw new Error("retry failed"); }, onHide)).toThrow("retry failed");
    expect(onHide).toHaveBeenCalledTimes(1);
  });

  it("supports optional callbacks", () => {
    expect(() => runToastAction()).not.toThrow();
  });
});
