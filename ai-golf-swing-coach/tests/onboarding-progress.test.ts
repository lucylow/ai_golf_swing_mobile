import { describe, expect, it } from "vitest";
import { formatOnboardingProgressAnnouncement } from "../lib/onboarding-progress";

describe("onboarding progress announcements", () => {
  it("announces the current step and title", () => {
    expect(formatOnboardingProgressAnnouncement(1, 4, "Learn from the best")).toBe("Step 2 of 4: Learn from the best");
  });

  it("clamps progress to the final step", () => {
    expect(formatOnboardingProgressAnnouncement(8, 4, "Player setup")).toBe("Step 4 of 4: Player setup");
  });
});
