import { AsyncMutex } from '../core/mutex';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

export type AnalysisJob = { id: string; uri: string; createdAt: number };

export class AnalysisQueue {
  private jobs: AnalysisJob[] = [];
  private active = false;
  private readonly mutex = new AsyncMutex();

  async enqueue(job: AnalysisJob): Promise<void> {
    await this.mutex.runExclusive(async () => {
      if (this.jobs.some((item) => item.id === job.id) || this.active) {
        throw new AppError({ code: RELEASE_ERROR_CODES.ANALYSIS_BUSY, message: 'An analysis is already in progress.', userMessage: 'Finish the current analysis before starting another.' });
      }
      this.jobs.push(job);
    });
  }

  async take(): Promise<AnalysisJob | undefined> {
    return this.mutex.runExclusive(async () => {
      if (this.active) return undefined;
      const next = this.jobs.shift();
      if (next) this.active = true;
      return next;
    });
  }

  async finish(): Promise<void> {
    await this.mutex.runExclusive(async () => { this.active = false; });
  }

  clear() { this.jobs = []; }
  snapshot() { return { queueLength: this.jobs.length, active: this.active }; }
}
