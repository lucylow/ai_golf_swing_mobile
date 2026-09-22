export function emptyStateAccessibilityLabel(title: string, description: string): string {
  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim();
  return [normalizedTitle, normalizedDescription].filter(Boolean).join(". ") || "No content available";
}
