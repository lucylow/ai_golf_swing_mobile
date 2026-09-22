export const profileCoachModeOptions = ["explore", "focus", "coach"] as const;
export type ProfileCoachMode = (typeof profileCoachModeOptions)[number];

export function nextProfileCoachMode(mode: string): ProfileCoachMode {
  const index = profileCoachModeOptions.indexOf(mode as ProfileCoachMode);
  return profileCoachModeOptions[(index + 1 + profileCoachModeOptions.length) % profileCoachModeOptions.length];
}

export function formatProfileCoachMode(mode: ProfileCoachMode) {
  return mode === "explore" ? "Explore" : mode === "focus" ? "Focus" : "Coach";
}

