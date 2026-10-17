"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
    minLandmarkConfidence: 0.45,
    minFrameQuality: 0.55,
    minFrames: 24,
    maxGapFrames: 3,
    smoothing: { enabled: true, cutoffHz: 1.25, beta: 0.018, minCutoffHz: 0.35 },
    quality: { minVisibleFraction: 0.65, maxJitter: 0.045, minCoverage: 0.75 },
    phase: { minSwingMs: 450, minPhaseMs: 60 },
    runtime: { maxFps: 30, maxLatencyMs: 120, maxQueue: 3 },
};
