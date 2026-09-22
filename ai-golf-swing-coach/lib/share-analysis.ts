import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";
import { getShareMode } from "./share-mode";
import { formatShareAnalysisMessage } from "./share-analysis-feedback";
import { reportAppError } from "./error-reporting";

export async function shareAnalysisSummary(summary: string) {
  const mode = getShareMode(Platform.OS === "web" ? "web" : Platform.OS === "ios" ? "ios" : "android");
  if (mode === "web-fallback") return { mode, shared: false, message: summary };
  try {
    const available = await Sharing.isAvailableAsync();
    if (!available) return { mode, shared: false, message: formatShareAnalysisMessage("unavailable") };
    const directory = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;
    if (!directory) return { mode, shared: false, message: formatShareAnalysisMessage("error") };
    const fileUri = `${directory}ai-golf-swing-coach-report-${Date.now()}.txt`;
    await FileSystem.writeAsStringAsync(fileUri, summary, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri, { dialogTitle: "Save swing report", mimeType: "text/plain" });
    return { mode, shared: true, message: "Swing report is ready in the share sheet." };
  } catch (error) {
    reportAppError("share-analysis", error);
    return { mode, shared: false, message: formatShareAnalysisMessage("error") };
  }
}
