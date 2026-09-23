export type CaptureMode = "native" | "simulated";
export function getCaptureMode(platform: "web" | "ios" | "android" | "native"): CaptureMode { return platform === "web" ? "simulated" : "native"; }
export function canRecordOnMode(mode: CaptureMode) { return mode === "native" || mode === "simulated"; }
