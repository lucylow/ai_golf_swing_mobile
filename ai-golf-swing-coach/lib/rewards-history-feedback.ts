export function formatClearRewardsHistoryMessage(result: "success" | "error") {
  return result === "success"
    ? "Rewards activity cleared locally."
    : "Could not clear rewards activity. Try again.";
}

