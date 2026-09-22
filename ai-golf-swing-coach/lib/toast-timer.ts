export type ToastTimerHandle = ReturnType<typeof setTimeout>;

export function createToastDismissTimer(
  onDismiss: () => void,
  delayMs = 3600,
  schedule: (callback: () => void, delay: number) => ToastTimerHandle = setTimeout,
  cancel: (handle: ToastTimerHandle) => void = clearTimeout,
) {
  let handle: ToastTimerHandle | null = null;
  handle = schedule(() => {
    handle = null;
    onDismiss();
  }, delayMs);

  return () => {
    if (handle === null) return;
    cancel(handle);
    handle = null;
  };
}
