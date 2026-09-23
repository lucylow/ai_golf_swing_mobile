export function formatSessionDeleteMessage(result: "success" | "error") {
  return result === "success" ? "Session deleted" : "Could not delete session. Try again.";
}

