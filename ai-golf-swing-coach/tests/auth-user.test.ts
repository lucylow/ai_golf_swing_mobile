import { describe, expect, it } from "vitest";
import { parseStoredUserInfo } from "../lib/auth-user";

describe("stored user profile parsing", () => {
  it("normalizes a valid serialized profile and date", () => {
    const user = parseStoredUserInfo(JSON.stringify({ id: 7, openId: "user-7", name: "Alex", email: null, loginMethod: "oauth", lastSignedIn: "2026-08-23T12:00:00.000Z" }));
    expect(user?.id).toBe(7);
    expect(user?.lastSignedIn).toBeInstanceOf(Date);
    expect(user?.lastSignedIn.toISOString()).toBe("2026-08-23T12:00:00.000Z");
  });

  it("rejects malformed or incomplete profiles", () => {
    expect(parseStoredUserInfo("not-json")).toBeNull();
    expect(parseStoredUserInfo(JSON.stringify({ id: 7, openId: "", lastSignedIn: "2026-08-23" }))).toBeNull();
    expect(parseStoredUserInfo(JSON.stringify({ id: "7", openId: "user-7", lastSignedIn: "2026-08-23" }))).toBeNull();
  });

  it("normalizes unexpected nullable fields instead of exposing invalid values", () => {
    const user = parseStoredUserInfo(JSON.stringify({ id: 7, openId: "user-7", name: 42, email: {}, loginMethod: false, lastSignedIn: "2026-08-23" }));
    expect(user).toMatchObject({ id: 7, openId: "user-7", name: null, email: null, loginMethod: null });
  });
});
