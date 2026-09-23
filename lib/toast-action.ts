export function runToastAction(action?: () => void, onHide?: () => void) {
  try {
    action?.();
  } finally {
    onHide?.();
  }
}
