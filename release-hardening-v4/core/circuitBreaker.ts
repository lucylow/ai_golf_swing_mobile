import { AppError } from './AppError';
import { RELEASE_ERROR_CODES } from './errorCodes';

type State = 'closed' | 'open' | 'half-open';

export class CircuitBreaker {
  private state: State = 'closed';
  private failures = 0;
  private openedAt = 0;
  private probeInFlight = false;

  constructor(private readonly threshold = 5, private readonly cooldownMs = 15_000) {}

  getState(): State { return this.state; }

  private ready(): boolean {
    if (this.state !== 'open') return true;
    if (Date.now() - this.openedAt < this.cooldownMs) return false;
    this.state = 'half-open';
    this.probeInFlight = false;
    return true;
  }

  async run<T>(operation: () => Promise<T>): Promise<T> {
    if (!this.ready()) {
      throw new AppError({
        code: RELEASE_ERROR_CODES.NETWORK_BAD_STATUS,
        message: 'Circuit breaker open.',
        userMessage: 'The service is temporarily unavailable. Please try again shortly.',
        retryable: true,
      });
    }
    if (this.state === 'half-open' && this.probeInFlight) {
      throw new AppError({ code: RELEASE_ERROR_CODES.NETWORK_BAD_STATUS, message: 'Recovery probe in flight.', retryable: true });
    }
    this.probeInFlight = this.state === 'half-open';
    try {
      const value = await operation();
      this.failures = 0;
      this.state = 'closed';
      return value;
    } catch (error) {
      this.failures += 1;
      if (this.failures >= this.threshold) {
        this.state = 'open';
        this.openedAt = Date.now();
      }
      throw error;
    } finally {
      this.probeInFlight = false;
    }
  }
}
