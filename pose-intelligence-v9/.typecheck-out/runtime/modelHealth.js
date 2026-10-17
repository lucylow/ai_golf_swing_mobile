"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelHealth = void 0;
class ModelHealth {
    constructor() {
        this.successes = 0;
        this.failures = 0;
        this.latencies = [];
    }
    observe(ok, latencyMs) { if (ok)
        this.successes++;
    else
        this.failures++; this.latencies.push(latencyMs); if (this.latencies.length > 200)
        this.latencies.shift(); }
    snapshot() { const total = this.successes + this.failures; const a = [...this.latencies].sort((x, y) => x - y); return { successRate: total ? this.successes / total : 1, failureRate: total ? this.failures / total : 0, p95LatencyMs: a.length ? a[Math.floor(a.length * 0.95)] : 0 }; }
}
exports.ModelHealth = ModelHealth;
