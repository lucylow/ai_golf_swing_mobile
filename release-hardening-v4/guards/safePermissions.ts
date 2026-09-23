import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export async function requestCameraPermission(): Promise<boolean> {
  const result = await Camera.requestCameraPermissionsAsync();
  if (!result.granted) return false;
  return true;
}

export async function requestMicrophonePermission(): Promise<boolean> {
  const result = await Camera.requestMicrophonePermissionsAsync();
  if (!result.granted) return false;
  return true;
}

export async function requestPhotosPermission(): Promise<boolean> {
  const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return result.granted || result.accessPrivileges === 'limited';
}

export async function requireCameraPermission(): Promise<void> {
  if (!(await requestCameraPermission())) throw new AppError({ code: RELEASE_ERROR_CODES.CAMERA_PERMISSION, message: 'Camera permission denied.', userMessage: 'Camera access is needed to record a swing.' });
}

export async function requireMicrophonePermission(): Promise<void> {
  if (!(await requestMicrophonePermission())) throw new AppError({ code: RELEASE_ERROR_CODES.MICROPHONE_PERMISSION, message: 'Microphone permission denied.', userMessage: 'Microphone access is needed when recording swing audio.' });
}

export async function requirePhotosPermission(): Promise<void> {
  if (!(await requestPhotosPermission())) throw new AppError({ code: RELEASE_ERROR_CODES.MEDIA_PERMISSION, message: 'Photo library permission denied.', userMessage: 'Photo access is needed to choose an existing swing video.' });
}

export async function requestMediaLibraryPermission(): Promise<Awaited<ReturnType<typeof MediaLibrary.requestPermissionsAsync>>> {
  return MediaLibrary.requestPermissionsAsync();
}
