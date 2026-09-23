export function formatShareAnalysisMessage(result: "unavailable" | "error") {
  return result === "unavailable"
    ? "Sharing is not available on this device."
    : "Could not prepare the share sheet. Try again.";
}

