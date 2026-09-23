import * as SecureStore from 'expo-secure-store';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';
import { releaseLogger } from '../core/logger';

export async function secureGet(key: string): Promise<string | null> {
  try { return await SecureStore.getItemAsync(key, { keychainAccessible: SecureStore.WHEN_UNLOCKED }); }
  catch (error) {
    releaseLogger.error(error, { key });
    throw new AppError({ code: RELEASE_ERROR_CODES.STORAGE_READ, message: 'Secure storage read failed.', userMessage: 'We could not load your secure session.', cause: error });
  }
}

export async function secureSet(key: string, value: string): Promise<void> {
  try { await SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.WHEN_UNLOCKED }); }
  catch (error) {
    releaseLogger.error(error, { key });
    throw new AppError({ code: RELEASE_ERROR_CODES.STORAGE_WRITE, message: 'Secure storage write failed.', userMessage: 'We could not save your secure session.', cause: error });
  }
}

export async function secureDelete(key: string): Promise<void> {
  try { await SecureStore.deleteItemAsync(key); }
  catch (error) { releaseLogger.warn('secure delete failed', { key, error }); }
}
