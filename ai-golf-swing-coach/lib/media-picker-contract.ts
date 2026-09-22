export type PickedMediaResult = { canceled: boolean; uri: string | null; durationMillis: number | null; fileSizeBytes: number | null; assetId: string | null };

export function createSimulatedUploadResult(): PickedMediaResult {
  return { canceled: false, uri: "simulated://uploaded-swing", durationMillis: null, fileSizeBytes: null, assetId: null };
}

export function resolvePickedMediaUri(uri: string, localUri?: string | null): string {
  return uri.startsWith("ph://") && localUri ? localUri : uri;
}

export function formatPickedMediaMetadata(durationMillis: number | null, fileSizeBytes: number | null): string | null {
  const parts: string[] = [];
  if (typeof durationMillis === "number" && Number.isFinite(durationMillis) && durationMillis >= 0) parts.push(`${Math.round(durationMillis / 1000)} sec`);
  if (typeof fileSizeBytes === "number" && Number.isFinite(fileSizeBytes) && fileSizeBytes >= 0) parts.push(`${formatFileSize(fileSizeBytes)}`);
  return parts.length ? parts.join(" · ") : null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
}
