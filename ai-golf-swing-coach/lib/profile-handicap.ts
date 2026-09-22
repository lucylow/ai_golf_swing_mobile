export const profileHandicapOptions = ["8.2", "12.4", "20+"] as const;
export type ProfileHandicap = (typeof profileHandicapOptions)[number];

export function nextProfileHandicap(handicap: string): ProfileHandicap {
  const index = profileHandicapOptions.indexOf(handicap as ProfileHandicap);
  return profileHandicapOptions[(index + 1 + profileHandicapOptions.length) % profileHandicapOptions.length];
}

