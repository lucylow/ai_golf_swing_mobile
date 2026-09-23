import { AppError } from './AppError';
import { RELEASE_ERROR_CODES } from './errorCodes';

export async function withTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number,
  message = 'The operation timed out.',
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new AppError({
          code: RELEASE_ERROR_CODES.NETWORK_TIMEOUT,
          message,
          userMessage: 'That took longer than expected. Please try again.',
          retryable: true,
          context: { timeoutMs },
        })), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function createTimeoutSignal(timeoutMs: number): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    cancel: () => {
      clearTimeout(timer);
      controller.abort();
    },
  };
}
