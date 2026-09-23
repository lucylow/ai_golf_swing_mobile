export function formatOnboardingProgressAnnouncement(step: number, totalSteps: number, title: string) {
  return `Step ${Math.min(step + 1, totalSteps)} of ${totalSteps}: ${title}`;
}

