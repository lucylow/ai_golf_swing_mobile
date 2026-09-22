/**
 * Manus Runtime - Communication layer between Expo web app and parent container (next-agent-webapp)
 *
 * Simplified flow:
 * 1. initManusRuntime() called
 * 2. Send 'appDevServerReady' to parent to signal app is ready
 *
 * User will manually login via the app's login page - no automatic cookie injection.
 */

import { Platform } from "react-native";
import type { Metrics } from "react-native-safe-area-context";
import { reportAppError } from "@/lib/error-reporting";
import { isSpacePreviewerMessage, isValidSafeAreaInsetsPayload } from "@/lib/manus-runtime-recovery";

// Debug logging with timestamps
const DEBUG = true;
const log = (msg: string) => {
  if (!DEBUG) return;
  const ts = new Date().toISOString();
  console.log(`[ManusRuntime ${ts}] ${msg}`);
};

type MessageType = "appDevServerReady";
type SafeAreaInsets = { top: number; right: number; bottom: number; left: number };
type SafeAreaCallback = (metrics: Metrics) => void;

interface SpacePreviewerMessage {
  type: "SpacePreviewerChannel";
  payload: {
    type: string;
    from: "container" | "content";
    to: "container" | "content";
    payload: Record<string, unknown>;
  };
}

function isInIframe(): boolean {
  if (Platform.OS !== "web") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function isWeb(): boolean {
  return Platform.OS === "web";
}

function sendToParent(type: MessageType, payload: Record<string, unknown> = {}): void {
  // NOTE: Validate parent origin if we need to transfer sensitive data
  if (!isWeb() || !isInIframe()) return;

  const message: SpacePreviewerMessage = {
    type: "SpacePreviewerChannel",
    payload: { type, from: "content", to: "container", payload },
  };
  try {
    window.parent.postMessage(message, "*");
    log(`Sent to parent: ${type}`);
  } catch (error) {
    reportAppError("manus-runtime-post-message", error);
  }
}

let initialized = false;
let safeAreaCallback: SafeAreaCallback | null = null;

function handleMessage(event: MessageEvent<unknown>): void {
  // NOTE: Validate event.origin if we need to transfer sensitive data
  if (!isSpacePreviewerMessage(event.data)) return;
  const data = event.data;

  const { payload } = data;
  if (!payload || payload.to !== "content") return;

  if (payload.type === "setSafeAreaInsets" && isValidSafeAreaInsetsPayload(payload.payload) && safeAreaCallback) {
    const insets = payload.payload;
    const frame = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
    try {
      safeAreaCallback({ insets, frame });
    } catch (error) {
      reportAppError("manus-runtime-safe-area-callback", error);
    }
    log(
      `Received safe area insets from parent: top=${insets.top}, bottom=${insets.bottom}, left=${insets.left}, right=${insets.right}`,
    );
  }
}

/**
 * Subscribe to safe area updates from the parent container.
 */
export function subscribeSafeAreaInsets(callback: SafeAreaCallback): () => void {
  safeAreaCallback = callback;
  return () => {
    if (safeAreaCallback === callback) {
      safeAreaCallback = null;
    }
  };
}

/**
 * Initialize Manus Runtime - just notifies parent that app is ready
 */
export function initManusRuntime(): void {
  if (!isWeb() || !isInIframe()) return;
  if (initialized) return;

  log("initManusRuntime called");
  try {
    window.addEventListener("message", handleMessage);
    initialized = true;
    sendToParent("appDevServerReady", {});
  } catch (error) {
    reportAppError("manus-runtime-init", error);
  }
}

/**
 * Check if running inside preview iframe
 */
export function isRunningInPreviewIframe(): boolean {
  return isWeb() && isInIframe();
}
