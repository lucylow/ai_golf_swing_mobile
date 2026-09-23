import { AppError } from './AppError';
import { RELEASE_ERROR_CODES } from './errorCodes';

export function parseJson<T>(input: string, label = 'response'): T {
  try {
    return JSON.parse(input) as T;
  } catch (error) {
    throw new AppError({
      code: RELEASE_ERROR_CODES.NETWORK_PARSE,
      message: `Invalid JSON in ${label}.`,
      userMessage: 'We received an invalid response. Please try again.',
      context: { label },
      cause: error,
    });
  }
}

export function safeStringify(value: unknown, fallback = '{}'): string {
  try { return JSON.stringify(value) ?? fallback; }
  catch { return fallback; }
}
