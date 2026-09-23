export type ReleaseEnvironment = 'development' | 'preview' | 'production';

export function getReleaseEnvironment(): ReleaseEnvironment {
  const value = process.env.EXPO_PUBLIC_ENVIRONMENT;
  if (value === 'preview' || value === 'production') return value;
  return 'development';
}

export const releaseConfig = {
  environment: getReleaseEnvironment(),
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  maxVideoBytes: Number(process.env.EXPO_PUBLIC_MAX_VIDEO_BYTES ?? 350 * 1024 * 1024),
  analysisTimeoutMs: Number(process.env.EXPO_PUBLIC_ANALYSIS_TIMEOUT_MS ?? 120_000),
  reviewDemoMode: process.env.EXPO_PUBLIC_REVIEW_DEMO_MODE === 'true',
};
