export type ProfilePrivacy = "private" | "shared";

export function nextProfilePrivacy(privacy: ProfilePrivacy): ProfilePrivacy {
  return privacy === "private" ? "shared" : "private";
}

export function formatProfilePrivacy(privacy: ProfilePrivacy) {
  return privacy === "private" ? "Only me" : "Shared with coaches";
}

