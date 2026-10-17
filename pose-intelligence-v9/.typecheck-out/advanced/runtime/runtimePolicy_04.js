"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decide = decide;
exports.shouldEmit = shouldEmit;
function decide(sample) {
    let targetFps = 30;
    let inferenceEveryNFrames = 1;
    let degraded = false;
    let reason = 'nominal';
    if (sample.latencyMs > 98) {
        targetFps = 24;
        inferenceEveryNFrames = 1;
        reason = 'latency_guard';
    }
    if (sample.queueDepth > 3) {
        targetFps = 20;
        inferenceEveryNFrames = 2;
        reason = 'backpressure_guard';
    }
    if (sample.frameDropRatio > 0.12) {
        targetFps = Math.min(targetFps, 20);
        inferenceEveryNFrames = 2;
        reason = 'drop_guard';
    }
    if (sample.confidence < 0.48) {
        degraded = true;
        reason = 'confidence_guard';
    }
    return { inferenceEveryNFrames, targetFps, dropFrames: inferenceEveryNFrames > 1, degraded, reason };
}
function shouldEmit(sample) {
    return sample.latencyMs < 172 && sample.queueDepth <= 6;
}
