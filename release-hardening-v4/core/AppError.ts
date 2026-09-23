import { RELEASE_ERROR_CODES, type ReleaseErrorCode, RETRYABLE_CODES } from './errorCodes';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

export type ErrorContext = Record<string, string | number | boolean | null | undefined>;

export class AppError extends Error {
  readonly code: ReleaseErrorCode;
  readonly severity: ErrorSeverity;
  readonly retryable: boolean;
  readonly userMessage: string;
  readonly context: ErrorContext;
  readonly causeValue?: unknown;

  constructor(options: {
    code?: ReleaseErrorCode;
    message: string;
    userMessage?: string;
    severity?: ErrorSeverity;
    retryable?: boolean;
    context?: ErrorContext;
    cause?: unknown;
  }) {
    super(options.message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = options.code ?? RELEASE_ERROR_CODES.UNKNOWN;
    this.severity = options.severity ?? 'error';
    this.retryable = options.retryable ?? RETRYABLE_CODES.has(this.code);
    this.userMessage = options.userMessage ?? 'Something went wrong. Please try again.';
    this.context = options.context ?? {};
    this.causeValue = options.cause;
  }
}

export function toAppError(error: unknown, fallback?: Partial<ConstructorParameters<typeof AppError>[0]>): AppError {
  if (error instanceof AppError) return error;
  if (error instanceof Error) {
    return new AppError({
      ...fallback,
      message: error.message,
      cause: error,
    });
  }
  return new AppError({
    ...fallback,
    message: typeof error === 'string' ? error : 'Unknown application error',
    cause: error,
  });
}

export function getUserErrorMessage(error: unknown): string {
  return toAppError(error).userMessage;
}
