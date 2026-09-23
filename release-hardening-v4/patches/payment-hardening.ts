/**
 * Wrap the existing purchase adapter with explicit user-safe outcomes.
 */
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export async function safePurchase<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    throw new AppError({ code: RELEASE_ERROR_CODES.PURCHASE_FAILED, message: 'Purchase operation failed.', userMessage: 'The purchase did not complete. Your account was not changed by this app.', retryable: true, cause: error });
  }
}

export async function safeRestore<T>(operation: () => Promise<T>): Promise<T> {
  try { return await operation(); }
  catch (error) { throw new AppError({ code: RELEASE_ERROR_CODES.RESTORE_FAILED, message: 'Restore operation failed.', userMessage: 'We could not restore purchases right now. Please try again.', retryable: true, cause: error }); }
}
