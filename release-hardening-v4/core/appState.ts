import { AppState, type AppStateStatus } from 'react-native';

export type ReleaseLifecycle = 'active' | 'inactive' | 'background' | 'unknown';

export function normalizeLifecycle(status: AppStateStatus): ReleaseLifecycle {
  if (status === 'active') return 'active';
  if (status === 'background') return 'background';
  if (status === 'inactive') return 'inactive';
  return 'unknown';
}

export function subscribeAppLifecycle(handler: (state: ReleaseLifecycle) => void): () => void {
  const listener = (status: AppStateStatus) => handler(normalizeLifecycle(status));
  const subscription = AppState.addEventListener('change', listener);
  return () => subscription.remove();
}
