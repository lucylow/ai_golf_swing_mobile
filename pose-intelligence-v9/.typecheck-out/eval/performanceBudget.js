"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPerformanceBudget = void 0;
exports.budgetPass = budgetPass;
exports.defaultPerformanceBudget = { maxP95LatencyMs: 120, maxFrameDropRatio: 0.15, minTrackingContinuity: 0.8, maxMemoryMb: 180 };
function budgetPass(stats, b = exports.defaultPerformanceBudget) { return stats.p95LatencyMs <= b.maxP95LatencyMs && stats.dropRatio <= b.maxFrameDropRatio && stats.continuity >= b.minTrackingContinuity && stats.memoryMb <= b.maxMemoryMb; }
