"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policyForClass = policyForClass;
function policyForClass(deviceClass) { switch (deviceClass) {
    case 'low': return { targetFps: 20, inferenceEveryNFrames: 2, maxQueue: 2, qualityFloor: 0.58, allowWorldLandmarks: false };
    case 'mid': return { targetFps: 24, inferenceEveryNFrames: 1, maxQueue: 3, qualityFloor: 0.55, allowWorldLandmarks: true };
    default: return { targetFps: 30, inferenceEveryNFrames: 1, maxQueue: 3, qualityFloor: 0.52, allowWorldLandmarks: true };
} }
