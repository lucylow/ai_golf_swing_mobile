"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackpressurePolicy = exports.LatencyMonitor = exports.FrameScheduler = void 0;
class FrameScheduler {
    constructor(maxQueue = 3) {
        this.maxQueue = maxQueue;
        this.queue = [];
    }
    push(packet) { if (this.queue.length >= this.maxQueue)
        this.queue.shift(); this.queue.push(packet); }
    next() { return this.queue.shift() ?? null; }
    size() { return this.queue.length; }
    clear() { this.queue = []; }
}
exports.FrameScheduler = FrameScheduler;
class LatencyMonitor {
    constructor() {
        this.samples = [];
    }
    add(ms) { this.samples.push(Math.max(0, ms)); if (this.samples.length > 120)
        this.samples.shift(); }
    p95() { if (!this.samples.length)
        return 0; const a = [...this.samples].sort((x, y) => x - y), i = Math.min(a.length - 1, Math.floor(a.length * 0.95)); return a[i]; }
    mean() { return this.samples.length ? this.samples.reduce((a, b) => a + b, 0) / this.samples.length : 0; }
}
exports.LatencyMonitor = LatencyMonitor;
class BackpressurePolicy {
    constructor(maxLatencyMs = 120) {
        this.maxLatencyMs = maxLatencyMs;
    }
    allow(packet) { return packet.latencyMs <= this.maxLatencyMs; }
}
exports.BackpressurePolicy = BackpressurePolicy;
