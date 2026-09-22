export function buttonAccessibilityState(disabled: boolean, loading: boolean) {
  return { disabled: disabled || loading, busy: loading };
}
