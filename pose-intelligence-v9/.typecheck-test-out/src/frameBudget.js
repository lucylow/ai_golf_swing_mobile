"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameBudgetController = void 0;
class FrameBudgetController {
    constructor(targetFps = 30, maxQueue = 3) {
        this.targetFps = targetFps;
        this.maxQueue = maxQueue;
        this.lastAcceptedMs = null;
    }
    decide(frame, queueDepth) {
        if (queueDepth > this.maxQueue)
            return { accept: false, reason: 'backpressure', targetIntervalMs: 1000 / this.targetFps };
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
    reset() { this.lastAcceptedMs = null; }
}
exports.FrameBudgetController = FrameBudgetController;
