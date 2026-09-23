export type MediaSourceKind = "native-video" | "uploaded-preview" | "captured-preview" | "unresolved-video" | "unknown";

export function classifyMediaSource(uri: string): MediaSourceKind {
  if (uri.startsWith("ph://")) return "unresolved-video";
  if (uri.startsWith("file://") || uri.startsWith("content://")) return "native-video";
  if (uri.startsWith("simulated://uploaded")) return "uploaded-preview";
  if (uri.startsWith("simulated://captured")) return "captured-preview";
  return "unknown";
}

export function isPlayableMediaSource(uri: string) { return classifyMediaSource(uri) === "native-video"; }
export function mediaSourceLabel(uri: string) { const kind = classifyMediaSource(uri); return kind === "native-video" ? "Native video ready" : kind === "uploaded-preview" ? "Uploaded preview ready" : kind === "captured-preview" ? "Preview capture ready" : kind === "unresolved-video" ? "Playback unavailable" : "Media preview ready"; }
export function mediaCaptureMode(uri: string): "native" | "simulated" { return isPlayableMediaSource(uri) ? "native" : "simulated"; }
export function mediaPlaybackRetryLabel(isRetrying: boolean) { return isRetrying ? "Resolving video playback" : "Retry video playback resolution"; }
export function mediaRetryAttemptLabel(attempts: number) { const count = Math.max(0, Math.floor(attempts)); return count === 0 ? "No resolution attempts yet" : `${count} resolution attempt${count === 1 ? "" : "s"}`; }
export const MAX_MEDIA_RETRY_ATTEMPTS = 3;
export function mediaRetryGuidance(attempts: number) { return attempts >= MAX_MEDIA_RETRY_ATTEMPTS ? "Choose another video to continue" : attempts >= 2 ? "Try another video if playback remains unavailable" : "Retry resolution or retake"; }
export function mediaRetryLimitReached(attempts: number) { return attempts >= MAX_MEDIA_RETRY_ATTEMPTS; }
export type MediaRecoveryState = "ready" | "retryable" | "retrying" | "replacement";
export function getMediaRecoveryState(uri: string, attempts: number, isRetrying = false): MediaRecoveryState { if (!uri.startsWith("ph://")) return "ready"; if (isRetrying) return "retrying"; return mediaRetryLimitReached(attempts) ? "replacement" : "retryable"; }
export function mediaReplacementPickerLabel(isChoosing: boolean) { return isChoosing ? "Opening video library" : "Choose a different swing video"; }
export function mediaReplacementCancellationMessage() { return "Replacement canceled; current video remains selected"; }
export function mediaUploadCancellationMessage() { return "Upload canceled; you can choose a video whenever you are ready"; }
