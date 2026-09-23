import { AppError, toAppError } from './AppError';
import { RELEASE_ERROR_CODES } from './errorCodes';
import { computeBackoff, isWithinRetryBudget, sleep } from './backoff';

export type RetryOptions = {
  maxAttempts?: number;
  shouldRetry?: (error: AppError, attempt: number) => boolean;
  onRetry?: (error: AppError, attempt: number, delayMs: number) => void;
  signal?: AbortSignal;
};

export async function retry<T>(operation: (attempt: number) => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const maxAttempts = Math.max(1, options.maxAttempts ?? 3);
  let attempt = 0;
  while (true) {
    if (options.signal?.aborted) {
      throw new AppError({ code: RELEASE_ERROR_CODES.NETWORK_ABORTED, message: 'Operation aborted.', retryable: false });
    }
    try {
      return await operation(attempt);
    } catch (rawError) {
      const error = toAppError(rawError);
      attempt += 1;
      const should = isWithinRetryBudget(attempt, maxAttempts) && (options.shouldRetry?.(error, attempt) ?? error.retryable);
      if (!should) throw error;
      const delayMs = computeBackoff(attempt - 1);
      options.onRetry?.(error, attempt, delayMs);
      await sleep(delayMs);
    }
  }
}
