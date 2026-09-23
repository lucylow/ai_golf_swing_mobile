export type ReleaseMessage = {
  code: string;
  message: string;
  recovery: string;
  severity: (code: string) => 'warning' | 'error';
  retryable: boolean;
};

export const AnalysisReleaseErrorCatalog: ReleaseMessage[] = [
  {
    code: 'empty',
    message: 'The analysis returned no usable swing metrics.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'timeout',
    message: 'Analysis is taking too long. Try a shorter clip.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'cancel',
    message: 'Analysis was cancelled before completion.',
    recovery: 'Analyze again',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'busy',
    message: 'Another swing is already being analyzed.',
    recovery: 'View current',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'quota',
    message: 'You have reached the current analysis allowance.',
    recovery: 'See plan',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'invalid',
    message: 'The analysis response could not be verified.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'stale',
    message: 'This result is no longer current. Analyze the latest swing.',
    recovery: 'Analyze latest',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'upload',
    message: 'The video could not be uploaded for analysis.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'server',
    message: 'The analysis service is temporarily unavailable.',
    recovery: 'Retry later',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'offline',
    message: 'Reconnect before starting a new cloud analysis.',
    recovery: 'Reconnect',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'duplicate',
    message: 'This swing was already submitted.',
    recovery: 'Open result',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'permission',
    message: 'Required media access is not available.',
    recovery: 'Settings',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
];

export function getAnalysisReleaseErrorCatalog(code: string): ReleaseMessage {
  return AnalysisReleaseErrorCatalog.find((item) => item.code === code) ?? {
    code,
    message: 'Something unexpected happened.',
    recovery: 'Try again',
    severity: () => 'error',
    retryable: false,
  };
}

export function isRetryableAnalysisReleaseErrorCatalog(code: string): boolean {
  return getAnalysisReleaseErrorCatalog(code).retryable;
}
