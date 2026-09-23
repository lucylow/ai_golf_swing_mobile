export function formatAnalysisCancellationMessage(reason: "user" | "lifecycle") {
  return reason === "user"
    ? "Analysis cancelled. Your captured swing is still available."
    : "Analysis stopped when the app became inactive. Your captured swing is still available.";
}

