export async function safelyTriggerFeedback(
  action: () => void | Promise<void>,
  onError?: (error: unknown) => void,
): Promise<void> {
  try {
    await action();
  } catch (error) {
    try {
      onError?.(error);
    } catch {
      // Error reporting is also best-effort and must never interrupt the user action.
    }
  }
}

export async function runSafely(
  action: () => void | Promise<void>,
  onError?: (error: unknown) => void,
): Promise<void> {
  try {
    await action();
  } catch (error) {
    try {
      onError?.(error);
    } catch {
      // Recovery reporting must never create a second user-facing failure.
    }
  }
}
