import { describe, expect, it } from "vitest";

import { withTimeout } from "../lib/request-timeout";

describe("withTimeout", () => {
  it("resolves before the timeout", async () => {
    await expect(withTimeout(Promise.resolve("ok"), 50)).resolves.toBe("ok");
  });

  it("rejects with a safe timeout error", async () => {
    await expect(withTimeout(new Promise(() => undefined), 1, "request expired")).rejects.toThrow("request expired");
  });

  it("preserves the promise when timeout is disabled", async () => {
    await expect(withTimeout(Promise.resolve(42), 0)).resolves.toBe(42);
  });
});
