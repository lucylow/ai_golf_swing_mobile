import { describe, expect, it } from "vitest";
import { externalLinkAction } from "../lib/external-link-state";

describe("externalLinkAction", () => {
  it("uses the platform default behavior on web", () => {
    expect(externalLinkAction("web", false)).toBe("default");
  });

  it("opens links in the in-app browser on native", () => {
    expect(externalLinkAction("native", false)).toBe("open-in-app-browser");
  });

  it("ignores duplicate launches while a browser is opening", () => {
    expect(externalLinkAction("native", true)).toBe("ignore");
    expect(externalLinkAction("web", true)).toBe("ignore");
  });
});
