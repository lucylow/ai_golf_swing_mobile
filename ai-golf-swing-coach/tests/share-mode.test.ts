import { describe, expect, it } from "vitest";
import { getShareMode } from "../lib/share-mode";

describe("share mode", () => {
  it("uses a web fallback in browsers", () => expect(getShareMode("web")).toBe("web-fallback"));
  it("uses native sharing on mobile platforms", () => { expect(getShareMode("ios")).toBe("native"); expect(getShareMode("android")).toBe("native"); });
});
