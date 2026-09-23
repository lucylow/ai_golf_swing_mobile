export type ShareMode = "native" | "web-fallback";
export function getShareMode(platform: "web" | "ios" | "android" | "native"): ShareMode { return platform === "web" ? "web-fallback" : "native"; }
