import * as Clipboard from 'expo-clipboard';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export async function safeCopy(text: string): Promise<void> {
  try { await Clipboard.setStringAsync(text); }
  catch (error) { throw new AppError({ code: RELEASE_ERROR_CODES.CLIPBOARD_FAILED, message: 'Clipboard write failed.', userMessage: 'We could not copy that right now.', cause: error }); }
}
