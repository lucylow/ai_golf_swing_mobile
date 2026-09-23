import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";

import { reportAppError } from "./error-reporting";

export type PracticeHistoryShareResult = {
  shared: boolean;
  usedFallback: boolean;
  message: string;
};

const SUCCESS_MESSAGE = "Practice history is ready in the share sheet.";
const FALLBACK_MESSAGE = "Sharing is unavailable here. Use Copy instead.";
const ERROR_MESSAGE = "Could not share practice history. Use Copy to try again.";

export async function sharePracticeHistorySummary(summary: string): Promise<PracticeHistoryShareResult> {
  if (Platform.OS === "web") return { shared: false, usedFallback: true, message: "Use Copy to export practice history on the web." };
  try {
    if (!(await Sharing.isAvailableAsync())) return { shared: false, usedFallback: true, message: FALLBACK_MESSAGE };
    const directory = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;
    if (!directory) return { shared: false, usedFallback: true, message: ERROR_MESSAGE };
    const fileUri = `${directory}ai-golf-swing-coach-practice-history-${Date.now()}.txt`;
    await FileSystem.writeAsStringAsync(fileUri, summary, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri, { dialogTitle: "Share practice history", mimeType: "text/plain" });
    return { shared: true, usedFallback: false, message: SUCCESS_MESSAGE };
  } catch (error) {
    reportAppError("share-practice-history", error);
    return { shared: false, usedFallback: true, message: ERROR_MESSAGE };
  }
}

export function practiceHistoryShareButtonLabel(isSharing: boolean): string {
  return isSharing ? "Sharing practice history" : "Share practice history";
}

export function practiceHistoryShareDisabled(hasHistory: boolean, isBusy: boolean): boolean {
  return !hasHistory || isBusy;
}

export function practiceHistoryShareSuccessMessage(): string {
  return SUCCESS_MESSAGE;
}

export function practiceHistoryShareFallbackMessage(): string {
  return FALLBACK_MESSAGE;
}

export function practiceHistoryShareErrorMessage(): string {
  return ERROR_MESSAGE;
}

export function shouldShowPracticeHistoryShare(platform: string): boolean {
  return platform === "ios" || platform === "android";
}

export function shouldUsePracticeHistoryClipboardFallback(result: PracticeHistoryShareResult): boolean {
  return !result.shared && result.usedFallback;
}
