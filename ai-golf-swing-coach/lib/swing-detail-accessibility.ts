export function swingDetailActionLabel(action: "compare" | "save", club: string): string {
  const normalizedClub = club.trim() || "swing";
  return action === "compare" ? `Compare this ${normalizedClub}` : `Save ${normalizedClub} report`;
}
