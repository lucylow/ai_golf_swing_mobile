export type ReleaseMessage = {
  code: string;
  message: string;
  recovery: string;
  severity: (code: string) => 'warning' | 'error';
  retryable: boolean;
};

export const NetworkReleaseErrorCatalog: ReleaseMessage[] = [
  {
    code: 'offline',
    message: 'You are offline. Saved content remains available.',
    recovery: 'Reconnect',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'timeout',
    message: 'The request timed out.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: '401',
    message: 'Your session needs to be refreshed.',
    recovery: 'Sign in',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: '403',
    message: 'This action is not available for the current account.',
    recovery: 'Review plan',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: '404',
    message: 'That resource is no longer available.',
    recovery: 'Go back',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: '409',
    message: 'That action conflicts with a newer session state.',
    recovery: 'Refresh',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: '429',
    message: 'Too many requests. Try again in a moment.',
    recovery: 'Wait',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: '500',
    message: 'The service encountered an error.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: '502',
    message: 'The service gateway is unavailable.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: '503',
    message: 'The service is temporarily unavailable.',
    recovery: 'Retry later',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: '504',
    message: 'The service took too long to respond.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'parse',
    message: 'The server response could not be read.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
];

export function getNetworkReleaseErrorCatalog(code: string): ReleaseMessage {
  return NetworkReleaseErrorCatalog.find((item) => item.code === code) ?? {
    code,
    message: 'Something unexpected happened.',
    recovery: 'Try again',
    severity: () => 'error',
    retryable: false,
  };
}

export function isRetryableNetworkReleaseErrorCatalog(code: string): boolean {
  return getNetworkReleaseErrorCatalog(code).retryable;
}
