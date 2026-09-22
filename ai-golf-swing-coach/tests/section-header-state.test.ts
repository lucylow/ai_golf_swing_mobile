import { describe, expect, it } from "vitest";
import { isSectionActionInteractive } from "../lib/section-header-state";

describe("isSectionActionInteractive", () => {
  it("recognizes wired actions as interactive", () => {
    expect(isSectionActionInteractive(() => undefined)).toBe(true);
  });

  it("recognizes missing handlers as static content", () => {
    expect(isSectionActionInteractive()).toBe(false);
  });
});
