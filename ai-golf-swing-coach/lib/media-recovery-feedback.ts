export function formatCaptureRecoveryMessage(result: "success" | "error" | "cancelled") {
  if (result === "success") return "Swing capture ready for review";
  if (result === "cancelled") return "Recording cancelled";
  return "Could not capture the swing. Check camera access and try again.";
}

export function formatPlaybackRecoveryMessage(result: "ready" | "still-unavailable" | "error") {
  if (result === "ready") return "Playback ready";
  if (result === "still-unavailable") return "Video is still unavailable; try another clip";
  return "Could not restore playback. Try another clip.";
}

