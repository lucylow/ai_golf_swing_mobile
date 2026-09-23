export function safelyRemoveSubscription(
  subscription: { remove: () => void } | undefined,
  onError?: (error: unknown) => void,
) {
  try {
    subscription?.remove();
  } catch (error) {
    try {
      onError?.(error);
    } catch {
      // Error reporting is best-effort and must never interrupt cleanup.
    }
  }
}
