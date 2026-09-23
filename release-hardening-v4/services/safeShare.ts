import * as Sharing from 'expo-sharing';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export async function canShareFiles(): Promise<boolean> {
  try { return await Sharing.isAvailableAsync(); }
  catch { return false; }
}

export async function safeShareFile(uri: string): Promise<void> {
  try {
    if (!(await canShareFiles())) throw new Error('System sharing unavailable.');
    await Sharing.shareAsync(uri, { dialogTitle: 'Share your golf session' });
  } catch (error) {
    throw new AppError({ code: RELEASE_ERROR_CODES.SHARE_FAILED, message: 'Share failed.', userMessage: 'We could not open the sharing sheet.', cause: error });
  }
}
