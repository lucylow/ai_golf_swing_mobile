import { AsyncMutex } from '../core/mutex';

const mutex = new AsyncMutex();
const inFlight = new Map<string, Promise<unknown>>();

export async function runIdempotent<T>(key: string, operation: () => Promise<T>): Promise<T> {
  return mutex.runExclusive(async () => {
    const existing = inFlight.get(key);
    if (existing) return existing as Promise<T>;
    const promise = operation();
    inFlight.set(key, promise);
    try {
      return await promise;
    } finally {
      inFlight.delete(key);
    }
  });
}

export function idempotencyKey(parts: Array<string | number | undefined>): string {
  return parts.filter((part) => part !== undefined).join(':');
}
