export type RetryAction = (() => void) | null;

export function isCurrentRetryGeneration(expected: number, current: number, isActive: boolean): boolean {
  return isActive && expected === current;
}

export function createSafeRetryAction(action: RetryAction, isActive: () => boolean = () => true): RetryAction {
  if (!action) return null;
  return () => {
    if (isActive()) action();
  };
}
