export const appErrorRecovery = {
  title: "Something went wrong",
  message: "The coaching screen could not load. Your saved swings are still stored on this device.",
  actionLabel: "Try loading the coaching screen again",
  actionHint: "Double tap to retry the screen",
} as const;

export function appErrorRecoveryAnnouncement(): string {
  return `${appErrorRecovery.title}. ${appErrorRecovery.message}`;
}

export function nextRecoveryKey(currentKey: number) {
  return Number.isFinite(currentKey) ? currentKey + 1 : 1;
}
