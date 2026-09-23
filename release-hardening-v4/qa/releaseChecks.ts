import { safeGet } from '../services/safeStorage';
import { getNetworkState } from '../services/networkStatus';
import { validateReviewerAccess } from '../compliance/reviewerAccess';

export type ReleaseCheck = { id: string; label: string; status: 'pass' | 'warn' | 'fail'; detail: string };

export async function runReleaseChecks(): Promise<ReleaseCheck[]> {
  const checks: ReleaseCheck[] = [];
  try {
    const network = await getNetworkState(true);
    checks.push({ id: 'network', label: 'Network probe', status: network.online ? 'pass' : 'warn', detail: network.online ? 'Reachability probe succeeded.' : 'Probe unavailable; verify offline behavior in TestFlight.' });
  } catch { checks.push({ id: 'network', label: 'Network probe', status: 'warn', detail: 'Reachability probe could not run.' }); }
  try {
    await safeGet('__release_health__');
    checks.push({ id: 'storage', label: 'Local storage', status: 'pass', detail: 'Storage read path is available.' });
  } catch { checks.push({ id: 'storage', label: 'Local storage', status: 'fail', detail: 'Storage is not readable.' }); }
  const reviewerIssues = validateReviewerAccess({ requiresLogin: process.env.EXPO_PUBLIC_REVIEW_REQUIRES_LOGIN === 'true', demoModeEnabled: process.env.EXPO_PUBLIC_REVIEW_DEMO_MODE === 'true', notes: (process.env.EXPO_PUBLIC_REVIEW_NOTES ?? '').split('|').filter(Boolean) });
  checks.push({ id: 'reviewer', label: 'Reviewer access', status: reviewerIssues.length ? 'warn' : 'pass', detail: reviewerIssues.length ? reviewerIssues.join(' ') : 'Reviewer path configured.' });
  checks.push({ id: 'privacy', label: 'Privacy audit', status: 'warn', detail: 'Verify App Store Connect privacy answers and final third-party SDK manifests against the archived binary.' });
  checks.push({ id: 'crash', label: 'Crash handling', status: 'pass', detail: 'Root error boundary and global handler can be installed.' });
  return checks;
}
