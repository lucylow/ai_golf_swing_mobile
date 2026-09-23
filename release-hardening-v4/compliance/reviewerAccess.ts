export type ReviewerAccess = {
  requiresLogin: boolean;
  demoModeEnabled: boolean;
  notes: string[];
};

export function validateReviewerAccess(input: ReviewerAccess): string[] {
  const issues: string[] = [];
  if (input.requiresLogin && !input.demoModeEnabled && !input.notes.some((note) => /demo account|test account/i.test(note))) {
    issues.push('Provide valid review credentials or an approved demo path.');
  }
  if (!input.notes.some((note) => /all features|full functionality/i.test(note))) {
    issues.push('Review instructions should explain how to exercise the complete feature set.');
  }
  return issues;
}
