import { PoseFrame } from './types';

export type FrameBudgetDecision = {
  accept: boolean;
  reason: 'first_frame' | 'sampled' | 'too_soon' | 'backpressure';
  targetIntervalMs: number;
};

export class FrameBudgetController {
  private lastAcceptedMs: number | null = null;
  constructor(private readonly targetFps = 30, private readonly maxQueue = 3) {}
  decide(frame: PoseFrame, queueDepth: number): FrameBudgetDecision {
    if (queueDepth > this.maxQueue) return { accept: false, reason: 'backpressure', targetIntervalMs: 1000 / this.targetFps };
    if (this.lastAcceptedMs === null) {
      this.lastAcceptedMs = frame.timestampMs;
      return { accept: true, reason: 'first_frame', targetIntervalMs: 1000 / this.targetFps };
    }
    const targetIntervalMs = 1000 / this.targetFps;
    if (frame.timestampMs - this.lastAcceptedMs + 1e-6 < targetIntervalMs) {
      return { accept: false, reason: 'too_soon', targetIntervalMs };
    }
    this.lastAcceptedMs = frame.timestampMs;
    return { accept: true, reason: 'sampled', targetIntervalMs };
  }
  reset(): void { this.lastAcceptedMs = null; }
}
