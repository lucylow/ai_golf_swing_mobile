export function normalizeNotifications(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

export function formatNotificationsMessage(enabled: boolean) {
  return enabled ? "Practice reminders turned on" : "Practice reminders turned off";
}

