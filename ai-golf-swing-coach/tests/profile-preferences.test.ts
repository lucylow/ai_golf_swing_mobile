import { describe, expect, it } from "vitest";
import { formatNotificationsMessage, normalizeNotifications } from "../lib/profile-preferences";

describe("profile preferences", () => {
  it("keeps valid reminder values and safely falls back for legacy data", () => {
    expect(normalizeNotifications(false)).toBe(false);
    expect(normalizeNotifications(true)).toBe(true);
    expect(normalizeNotifications("false")).toBe(true);
    expect(normalizeNotifications(undefined, false)).toBe(false);
  });

  it("formats reminder toggle confirmation copy", () => {
    expect(formatNotificationsMessage(true)).toBe("Practice reminders turned on");
    expect(formatNotificationsMessage(false)).toBe("Practice reminders turned off");
  });
});
