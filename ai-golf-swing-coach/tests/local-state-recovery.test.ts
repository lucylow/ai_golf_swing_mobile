import { describe, expect, it } from "vitest";
import { parseStoredJson } from "../lib/local-state-recovery";

describe("parseStoredJson", () => {
  it("returns the fallback when storage is empty", () => {
    expect(parseStoredJson(null, { ready: false })).toEqual({ ready: false });
  });

  it("returns the fallback when storage contains malformed JSON", () => {
    expect(parseStoredJson("{broken", ["safe-default"])).toEqual(["safe-default"]);
  });

  it("reports malformed JSON through the optional callback without throwing", () => {
    let received: unknown;
    expect(parseStoredJson("{private-data", "safe", undefined, (error) => { received = error; })).toBe("safe");
    expect(received).toBeInstanceOf(SyntaxError);
  });

  it("applies the normalizer to valid persisted data", () => {
    expect(parseStoredJson('{"count":"4"}', 0, (value) => Number((value as { count: string }).count))).toBe(4);
  });
});
