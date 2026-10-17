"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decide = decide;
exports.shouldEmit = shouldEmit;
function decide(sample) {
    let targetFps = 30;
    let inferenceEveryNFrames = 1;
    let degraded = false;
    let reason = 'nominal';
    if (sample.latencyMs > 112) {
        targetFps = 24;
        inferenceEveryNFrames = 1;
        reason = 'latency_guard';
    }
    if (sample.queueDepth > 4) {
        targetFps = 20;
        inferenceEveryNFrames = 2;
        reason = 'backpressure_guard';
    }
    if (sample.frameDropRatio > 0.21) {
        targetFps = Math.min(targetFps, 20);
        inferenceEveryNFrames = 2;
        reason = 'drop_guard';
    }
    if (sample.confidence < 0.51) {
        degraded = true;
        reason = 'confidence_guard';
    }
    return { inferenceEveryNFrames, targetFps, dropFrames: inferenceEveryNFrames > 1, degraded, reason };
}
function shouldEmit(sample) {
    return sample.latencyMs < 193 && sample.queueDepth <= 7;
}
