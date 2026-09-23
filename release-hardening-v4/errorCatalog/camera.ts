export type ReleaseMessage = {
  code: string;
  message: string;
  recovery: string;
  severity: (code: string) => 'warning' | 'error';
  retryable: boolean;
};

export const CameraReleaseErrorCatalog: ReleaseMessage[] = [
  {
    code: 'permission',
    message: 'Allow camera access to record your swing.',
    recovery: 'Settings',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'microphone',
    message: 'Allow microphone access if your recording includes audio.',
    recovery: 'Settings',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'busy',
    message: 'Finish the active recording before starting another.',
    recovery: 'Return',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'background',
    message: 'Recording paused because the app went into the background.',
    recovery: 'Review',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'interrupted',
    message: 'The camera session was interrupted. Try the recording again.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'device',
    message: 'This camera is not ready for capture right now.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'thermal',
    message: 'The device is warm. Capture may resume after it cools.',
    recovery: 'Retry',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: true,
  },
  {
    code: 'storage',
    message: 'There is not enough space to save the recording.',
    recovery: 'Free space',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'duration',
    message: 'Keep the swing clip within the supported duration.',
    recovery: 'Trim',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'orientation',
    message: 'Rotate the device back to the supported capture orientation.',
    recovery: 'Rotate',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'preview',
    message: 'Camera preview is unavailable; the analysis can still use an imported video.',
    recovery: 'Choose video',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
  {
    code: 'settings',
    message: 'Camera permission is blocked. Open Settings to enable it.',
    recovery: 'Settings',
    severity: code => code === 'server' ? 'error' : 'warning',
    retryable: false,
  },
];

export function getCameraReleaseErrorCatalog(code: string): ReleaseMessage {
  return CameraReleaseErrorCatalog.find((item) => item.code === code) ?? {
    code,
    message: 'Something unexpected happened.',
    recovery: 'Try again',
    severity: () => 'error',
    retryable: false,
  };
}

export function isRetryableCameraReleaseErrorCatalog(code: string): boolean {
  return getCameraReleaseErrorCatalog(code).retryable;
}
