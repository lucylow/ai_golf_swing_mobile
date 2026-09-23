export type ReleaseMessage = {
  code: string;
  message: string;
  recovery: string;
  severity: (code: string) => 'warning' | 'error';
  retryable: boolean;
};

export const MediaReleaseErrorCatalog: ReleaseMessage[] = [
  {
    code: 'missing',
    message: 'That video is no longer available on the device.',
    recovery: 'Choose another',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'large',
    message: 'That video is too large to upload.',
    recovery: 'Trim',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'format',
    message: 'Use an MP4 or MOV video.',
    recovery: 'Choose another',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'empty',
    message: 'The selected video contains no readable frames.',
    recovery: 'Choose another',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'duration',
    message: 'The selected clip is outside the supported duration.',
    recovery: 'Trim',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'permission',
    message: 'Photo library access is needed to choose a swing.',
    recovery: 'Settings',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'limited',
    message: 'Limited photo access is enabled. Choose the swing video manually.',
    recovery: 'Choose',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'deleted',
    message: 'This file was deleted before processing finished.',
    recovery: 'Choose another',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'corrupt',
    message: 'This video appears to be corrupted.',
    recovery: 'Choose another',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'unsupported',
    message: 'This media type is not supported on this device.',
    recovery: 'Choose another',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'cancel',
    message: 'Media selection was cancelled.',
    recovery: 'Choose video',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'quota',
    message: 'There is not enough local storage to prepare this video.',
    recovery: 'Free space',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
];

export function getMediaReleaseErrorCatalog(code: string): ReleaseMessage {
  return MediaReleaseErrorCatalog.find((item) => item.code === code) ?? {
    code,
    message: 'Something unexpected happened.',
    recovery: 'Try again',
    severity: () => 'error',
    retryable: false,
  };
}

export function isRetryableMediaReleaseErrorCatalog(code: string): boolean {
  return getMediaReleaseErrorCatalog(code).retryable;
}
