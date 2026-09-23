import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';
import { releaseLogger } from '../core/logger';
import { retry } from '../core/retryPolicy';
import { requireNetwork } from './networkStatus';

export type FetchPolicy = {
  timeoutMs?: number;
  maxAttempts?: number;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  skipNetworkProbe?: boolean;
};

export async function safeFetch(input: string, init: RequestInit = {}, policy: FetchPolicy = {}): Promise<Response> {
  if (!policy.skipNetworkProbe) await requireNetwork();
  const timeoutMs = policy.timeoutMs ?? 20_000;
  return retry(async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onAbort = () => controller.abort();
    policy.signal?.addEventListener('abort', onAbort, { once: true });
    try {
      const mergedHeaders: Record<string, string> = { Accept: 'application/json', ...(policy.headers ?? {}) };
      if (init.headers && typeof init.headers === 'object' && !Array.isArray(init.headers)) {
        Object.assign(mergedHeaders, init.headers as Record<string, string>);
      }
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
        headers: mergedHeaders,
      });
      if (response.ok) return response;
      if (response.status === 401 || response.status === 403) {
        throw new AppError({ code: RELEASE_ERROR_CODES.AUTH_EXPIRED, message: `HTTP ${response.status}`, retryable: false, userMessage: 'Your session needs to be refreshed.' });
      }
      if (response.status >= 400 && response.status < 500) {
        throw new AppError({ code: RELEASE_ERROR_CODES.NETWORK_BAD_STATUS, message: `HTTP ${response.status}`, retryable: false, context: { status: response.status } });
      }
      throw new AppError({ code: RELEASE_ERROR_CODES.NETWORK_BAD_STATUS, message: `HTTP ${response.status}`, retryable: true, context: { status: response.status } });
    } catch (error) {
      if (policy.signal?.aborted) {
        throw new AppError({ code: RELEASE_ERROR_CODES.NETWORK_ABORTED, message: 'Request aborted by caller.', userMessage: 'The request was cancelled.', retryable: false });
      }
      if (controller.signal.aborted) {
        throw new AppError({ code: RELEASE_ERROR_CODES.NETWORK_TIMEOUT, message: 'Request timed out.', userMessage: 'The connection took too long. Please try again.', retryable: true });
      }
      throw error;
    } finally {
      clearTimeout(timer);
      policy.signal?.removeEventListener('abort', onAbort);
    }
  }, {
    maxAttempts: policy.maxAttempts ?? 2,
    signal: policy.signal,
    onRetry: (error, attempt, delayMs) => releaseLogger.warn('request retry', { code: error.code, attempt, delayMs, input }),
  });
}
