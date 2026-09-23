import { releaseLogger } from '../core/logger';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

let lastCheckedAt = 0;
let lastOnline = true;
const CACHE_MS = 15_000;
const DEFAULT_PROBE = process.env.EXPO_PUBLIC_NETWORK_PROBE_URL || process.env.EXPO_PUBLIC_API_BASE_URL || '';

export type NetworkState = { online: boolean; checkedAt: number; latencyMs?: number };

export async function getNetworkState(force = false): Promise<NetworkState> {
  const now = Date.now();
  if (!force && now - lastCheckedAt < CACHE_MS) return { online: lastOnline, checkedAt: lastCheckedAt };
  if (!DEFAULT_PROBE) {
    lastOnline = true;
    lastCheckedAt = now;
    return { online: true, checkedAt: lastCheckedAt };
  }
  const started = Date.now();
  try {
    const response = await fetch(DEFAULT_PROBE, { method: 'HEAD' });
    lastOnline = response.ok;
  } catch (error) {
    lastOnline = false;
    releaseLogger.warn('network probe failed', { error });
  }
  lastCheckedAt = Date.now();
  return { online: lastOnline, checkedAt: lastCheckedAt, latencyMs: Date.now() - started };
}

export async function requireNetwork(): Promise<void> {
  const state = await getNetworkState();
  if (!state.online) {
    throw new AppError({
      code: RELEASE_ERROR_CODES.NETWORK_OFFLINE,
      message: 'Network unavailable.',
      userMessage: 'You appear to be offline. Reconnect and try again.',
      retryable: true,
    });
  }
}
