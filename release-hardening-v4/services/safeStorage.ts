import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';
import { releaseLogger } from '../core/logger';

export async function safeGet(key: string): Promise<string | null> {
  try { return await AsyncStorage.getItem(key); }
  catch (error) {
    releaseLogger.error(error, { key });
    throw new AppError({ code: RELEASE_ERROR_CODES.STORAGE_READ, message: `Storage read failed: ${key}`, userMessage: 'We could not load your saved data.', cause: error });
  }
}

export async function safeSet(key: string, value: string): Promise<void> {
  try { await AsyncStorage.setItem(key, value); }
  catch (error) {
    releaseLogger.error(error, { key });
    throw new AppError({ code: RELEASE_ERROR_CODES.STORAGE_WRITE, message: `Storage write failed: ${key}`, userMessage: 'We could not save that change. Please try again.', cause: error });
  }
}

export async function safeGetJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await safeGet(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; }
  catch (error) {
    releaseLogger.warn('storage json corrupt; falling back', { key });
    return fallback;
  }
}

export async function safeSetJson<T>(key: string, value: T): Promise<void> {
  await safeSet(key, JSON.stringify(value));
}

export async function safeRemove(key: string): Promise<void> {
  try { await AsyncStorage.removeItem(key); }
  catch (error) { releaseLogger.error(error, { key }); }
}
