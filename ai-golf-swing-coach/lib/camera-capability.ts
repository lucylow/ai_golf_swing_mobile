export type CameraCapability = { supported: boolean; canRecordVideo: boolean; reason?: string };

export function getCameraCapability(platform: "web" | "ios" | "android" | "native" = "native"): CameraCapability {
  if (platform === "web") return { supported: false, canRecordVideo: false, reason: "Camera recording requires the native iOS or Android build." };
  return { supported: true, canRecordVideo: true };
}

export function shouldRefreshCameraPermission(platform: "web" | "ios" | "android" | "native", isActive: boolean) { return platform !== "web" && isActive; }

export type CameraReadiness = "web" | "checking" | "ready" | "needs-permission" | "settings";
export function getCameraReadiness(platform: "web" | "ios" | "android" | "native", permission: { granted: boolean; canAskAgain?: boolean } | null, isLoading = false): CameraReadiness { if (platform === "web") return "web"; if (isLoading || !permission) return "checking"; if (permission.granted) return "ready"; return permission.canAskAgain === false ? "settings" : "needs-permission"; }
export function cameraReadinessLabel(readiness: CameraReadiness) { return readiness === "web" ? "Web simulation" : readiness === "checking" ? "Checking camera" : readiness === "ready" ? "Camera ready" : readiness === "settings" ? "Open Settings" : "Camera access needed"; }
export function cameraReadinessCueLabel(readiness: CameraReadiness, cueVisible: boolean) { return cueVisible && readiness === "ready" ? "Camera ready to record" : cameraReadinessLabel(readiness); }
export function shouldAnimateCameraReadiness(platform: "web" | "ios" | "android" | "native", cueVisible: boolean) { return platform !== "web" && cueVisible; }
export function isRecordingBlocked(readiness: CameraReadiness) { return readiness === "settings"; }
export function recordingControlLabel(readiness: CameraReadiness) { return isRecordingBlocked(readiness) ? "Recording unavailable — open camera settings" : "Record a swing"; }

export function cameraPermissionTransitionMessage(previousGranted: boolean | null, granted: boolean) { return previousGranted === false && granted ? "Camera access restored" : ""; }
export function shouldAnnounceCameraRestored(platform: "web" | "ios" | "android" | "native", previousGranted: boolean | null, granted: boolean) { return platform !== "web" && Boolean(cameraPermissionTransitionMessage(previousGranted, granted)); }

export function cameraPermissionMessage(granted: boolean, canAskAgain = true) {
  if (granted) return "Camera access is ready";
  return canAskAgain ? "Camera access is needed to record a swing. Try again when ready." : "Camera access is off. Enable it in device settings to record a swing.";
}

export function cameraPermissionErrorMessage() {
  return "Could not check camera access. Try again or open device settings.";
}
