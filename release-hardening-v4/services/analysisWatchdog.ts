import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';
import { withTimeout } from '../core/timeout';

export async function withAnalysisWatchdog<T>(operation: Promise<T>, timeoutMs = 120_000): Promise<T> {
  try {
    return await withTimeout(operation, timeoutMs, 'Swing analysis timed out.');
  } catch (error) {
    if (error instanceof AppError && error.code === RELEASE_ERROR_CODES.NETWORK_TIMEOUT) {
      throw new AppError({ code: RELEASE_ERROR_CODES.ANALYSIS_TIMEOUT, message: 'AI analysis exceeded the watchdog.', userMessage: 'Analysis took too long. Try the swing again or choose a shorter clip.', retryable: true, cause: error });
    }
    throw error;
  }
}
