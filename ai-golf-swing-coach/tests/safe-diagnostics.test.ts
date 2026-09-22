import { describe, expect, it } from "vitest";
import { describeError, describeRequest } from "../lib/safe-diagnostics";

describe("safe diagnostics", () => {
  it("returns an error category without exposing the message", () => {
    expect(describeError(new Error("Bearer secret-token"))).toBe("Error");
    expect(describeError({ message: "private payload" })).toBe("UnknownError");
  });

  it("contains only safe request metadata", () => {
    expect(describeRequest("/api/auth/me", "GET", true)).toEqual({
      endpoint: "/api/auth/me",
      method: "GET",
      hasToken: true,
    });
  });

  it("removes query and fragment data from request metadata", () => {
    expect(describeRequest("/api/oauth/mobile?code=secret&state=private#callback", "GET")).toEqual({
      endpoint: "/api/oauth/mobile",
      method: "GET",
      hasToken: false,
    });
  });
});
