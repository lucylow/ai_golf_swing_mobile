import { Platform } from "react-native";
import { createSimulatedUploadResult, resolvePickedMediaUri, type PickedMediaResult } from "@/lib/media-picker-contract";
import { reportAppError } from "@/lib/error-reporting";

export async function resolveMediaLibraryUri(uri: string, assetId: string | null): Promise<string> {
  if (Platform.OS === "web" || !assetId || !uri.startsWith("ph://")) return uri;
  try {
    const MediaLibrary = await import("expo-media-library");
    const info = await MediaLibrary.getAssetInfoAsync(assetId);
    return resolvePickedMediaUri(uri, info.localUri);
  } catch (error) {
    reportAppError("media-library-resolution", error);
    return uri;
  }
}

export async function pickSwingVideo(): Promise<PickedMediaResult> {
  if (Platform.OS === "web") return createSimulatedUploadResult();
  const ImagePicker = await import("expo-image-picker");
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["videos"],
    allowsEditing: false,
    quality: 1,
    videoMaxDuration: 60,
  });
  if (result.canceled || !result.assets[0]?.uri) return { canceled: true, uri: null, durationMillis: null, fileSizeBytes: null, assetId: null };
  const asset = result.assets[0];
  const resolvedUri = await resolveMediaLibraryUri(asset.uri, asset.assetId ?? null);
  return { canceled: false, uri: resolvedUri, durationMillis: asset.duration ?? null, fileSizeBytes: asset.fileSize ?? null, assetId: asset.assetId ?? null };
}
