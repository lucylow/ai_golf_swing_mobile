/**
 * Drop-in helpers for the existing analyze route.
 * Keep the current capture/ML pipeline; wrap only the risky edges.
 */
import { validateVideo } from '../services/mediaValidation';
import { withAnalysisWatchdog } from '../services/analysisWatchdog';
import { runIdempotent } from '../services/idempotency';

export async function prepareAnalyzeUri(uri: string) {
  return validateVideo(uri);
}

export function runAnalysisOnce<T>(swingId: string, operation: () => Promise<T>) {
  return runIdempotent(`analysis:${swingId}`, () => withAnalysisWatchdog(operation()));
}
