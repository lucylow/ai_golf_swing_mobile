import { AppError, toAppError } from './AppError';

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });

export const err = (error: unknown): Result<never> => ({
  ok: false,
  error: toAppError(error),
});

export async function tryResult<T>(operation: () => Promise<T>): Promise<Result<T>> {
  try {
    return ok(await operation());
  } catch (error) {
    return err(error);
  }
}

export function unwrapOr<T>(result: Result<T>, fallback: T): T {
  return result.ok ? result.value : fallback;
}

export function mapResult<T, U>(result: Result<T>, mapper: (value: T) => U): Result<U> {
  return result.ok ? ok(mapper(result.value)) : result;
}
