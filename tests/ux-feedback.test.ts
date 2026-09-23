import { describe, expect, it } from "vitest";
import { safelyTriggerFeedback } from "../lib/safe-feedback";

describe("safelyTriggerFeedback", () => {
  it("contains rejected native feedback promises", async () => {
    await expect(safelyTriggerFeedback(async () => {
      throw new Error("haptics unavailable");
    })).resolves.toBeUndefined();
  });

  it("contains synchronous feedback setup failures", async () => {
    await expect(safelyTriggerFeedback(() => {
      throw new Error("native setup failed");
    })).resolves.toBeUndefined();
  });

  it("resolves after successful feedback", async () => {
    await expect(safelyTriggerFeedback(async () => undefined)).resolves.toBeUndefined();
  });

  it("optionally observes a failure without rethrowing", async () => {
    let received: unknown;
    await expect(safelyTriggerFeedback(() => { throw new Error("feedback unavailable"); }, (error) => { received = error; })).resolves.toBeUndefined();
    expect(received).toBeInstanceOf(Error);
  });

  it("contains failures from the optional observer", async () => {
    await expect(safelyTriggerFeedback(() => { throw new Error("feedback unavailable"); }, () => { throw new Error("observer unavailable"); })).resolves.toBeUndefined();
  });
});
