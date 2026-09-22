export type FeedbackTone = "success" | "error" | "info";
export type FeedbackLiveRegion = "assertive" | "polite";

export function feedbackLiveRegion(tone: FeedbackTone): FeedbackLiveRegion {
  return tone === "error" ? "assertive" : "polite";
}
