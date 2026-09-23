import * as FileSystem from 'expo-file-system';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export type ValidatedVideo = { uri: string; sizeBytes: number; extension: string };

const MAX_BYTES = Number(process.env.EXPO_PUBLIC_MAX_VIDEO_BYTES ?? 350 * 1024 * 1024);
const ALLOWED_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.avi', '.webm']);

export async function validateVideo(uri: string): Promise<ValidatedVideo> {
  if (!uri || typeof uri !== 'string') throw new AppError({ code: RELEASE_ERROR_CODES.MEDIA_MISSING, message: 'Missing video URI.', userMessage: 'Please choose a swing video.' });
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) throw new AppError({ code: RELEASE_ERROR_CODES.MEDIA_MISSING, message: 'Video asset does not exist.', userMessage: 'That video is no longer available.' });
  const extension = uri.match(/\.[a-z0-9]+$/i)?.[0].toLowerCase() ?? '';
  if (!ALLOWED_EXTENSIONS.has(extension)) throw new AppError({ code: RELEASE_ERROR_CODES.MEDIA_INVALID, message: 'Unsupported video type.', userMessage: 'Please select an MP4 or MOV video.' });
  const sizeBytes = Number(info.size ?? 0);
  if (sizeBytes > MAX_BYTES) throw new AppError({ code: RELEASE_ERROR_CODES.MEDIA_TOO_LARGE, message: 'Video exceeds upload limit.', userMessage: 'That video is too large. Choose a shorter clip.' });
  return { uri, sizeBytes, extension };
}
