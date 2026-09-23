import { describe, expect, it } from "vitest";
import { offlineBannerMessage } from "../lib/offline-banner-state";

describe("offline banner", () => {
  it("keeps the local-first recovery message explicit", () => {
    expect(offlineBannerMessage).toContain("Offline mode");
    expect(offlineBannerMessage).toContain("stay on this device");
  });
});
