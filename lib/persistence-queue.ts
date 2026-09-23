type AsyncTask<T> = () => Promise<T>;

/**
 * Serializes asynchronous persistence work while preserving each task's
 * original rejection for the caller. A rejected task does not poison the
 * queue for later writes.
 */
export function createPersistenceQueue() {
  let tail: Promise<void> = Promise.resolve();

  return function enqueue<T>(task: AsyncTask<T>): Promise<T> {
    const next = tail.then(task);
    tail = next.then(
      () => undefined,
      () => undefined,
    );
    return next;
  };
}

export function createHydrationGate() {
  let released = false;
  let releasePromise: () => void = () => undefined;
  const promise = new Promise<void>((resolve) => {
    releasePromise = () => {
      if (released) return;
      released = true;
      resolve();
    };
  });

  return {
    wait: () => (released ? Promise.resolve() : promise),
    release: releasePromise,
  };
}

export function createPendingWorkTracker() {
  let pending = 0;

  return {
    begin() { pending += 1; },
    end() { pending = Math.max(0, pending - 1); },
    isPending() { return pending > 0; },
  };
}

export type { AsyncTask };
