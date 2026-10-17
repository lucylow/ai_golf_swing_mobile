"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveStreamTimestampGuard = exports.defaultMediaPipeOptionsV9 = void 0;
exports.validateMediaPipeTimestamp = validateMediaPipeTimestamp;
exports.mediaPipeResultToPacket = mediaPipeResultToPacket;
const confidence_1 = require("./confidence");
exports.defaultMediaPipeOptionsV9 = {
    runningMode: 'LIVE_STREAM',
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    outputSegmentationMasks: false,
};
function validateMediaPipeTimestamp(previous, next) {
    if (!Number.isFinite(next))
        return { valid: false, reason: 'timestamp_not_finite' };
    if (previous !== null && next <= previous)
        return { valid: false, reason: 'timestamp_not_monotonic' };
    return { valid: true, reason: null };
}
function mediaPipeResultToPacket(result, latencyMs) {
    const landmarks = result.landmarks.map((point, id) => ({
        id,
        x: point.x,
        y: point.y,
        z: point.z,
        visibility: point.visibility ?? point.score ?? 1,
        confidence: (0, confidence_1.combineConfidence)(point.score ?? 1, point.visibility ?? 1, point.presence ?? 1),
        presence: point.presence,
    }));
    return {
        runtime: 'mediapipe',
        timestampMs: result.timestampMs,
        landmarks,
        latencyMs,
        detectionConfidence: landmarks.reduce((sum, p) => sum + p.confidence, 0) / Math.max(1, landmarks.length),
        trackingConfidence: landmarks.reduce((sum, p) => sum + p.visibility, 0) / Math.max(1, landmarks.length),
    };
}
class LiveStreamTimestampGuard {
    constructor() {
        this.lastTimestamp = null;
    }
    accept(timestampMs) {
        const result = validateMediaPipeTimestamp(this.lastTimestamp, timestampMs);
        if (!result.valid)
            return false;
        this.lastTimestamp = timestampMs;
        return true;
    }
    reset() { this.lastTimestamp = null; }
    last() { return this.lastTimestamp; }
}
exports.LiveStreamTimestampGuard = LiveStreamTimestampGuard;
