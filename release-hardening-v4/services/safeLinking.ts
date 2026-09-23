import * as Linking from 'expo-linking';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export async function safeOpenUrl(url: string): Promise<boolean> {
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) throw new Error('URL scheme is unavailable.');
    await Linking.openURL(url);
    return true;
  } catch (error) {
    throw new AppError({ code: RELEASE_ERROR_CODES.LINKING_FAILED, message: `Unable to open ${url}`, userMessage: 'That link could not be opened on this device.', cause: error });
  }
}

export function makeSafeCallbackUrl(route: string): string {
  return Linking.createURL(route.replace(/^\//, ''));
}
