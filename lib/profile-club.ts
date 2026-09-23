export const profileClubOptions = ["7 iron", "Driver", "Wedge"] as const;
export type ProfileClub = (typeof profileClubOptions)[number];

export function nextProfileClub(club: string): ProfileClub {
  const index = profileClubOptions.indexOf(club as ProfileClub);
  return profileClubOptions[(index + 1 + profileClubOptions.length) % profileClubOptions.length];
}

