import { AppError, toAppError } from './AppError';
import { releaseLogger } from './logger';

export async function runSafely<T>(
  operation: () => Promise<T>,
  fallback: T,
  context: Record<string, unknown> = {},
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const appError = toAppError(error);
    releaseLogger.error(appError, context);
    return fallback;
  }
}

export async function runOrThrow<T>(operation: () => Promise<T>, context: Record<string, unknown> = {}): Promise<T> {
  try { return await operation(); }
  catch (error) {
    const appError = toAppError(error);
    releaseLogger.error(appError, context);
    throw appError;
  }
}

export function assertSafe<T>(value: T | undefined | null, message: string): T {
  if (value === undefined || value === null) throw new AppError({ message });
  return value;
}
