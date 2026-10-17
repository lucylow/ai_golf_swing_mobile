"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roiFromPose = roiFromPose;
exports.opticalFlowConfidence = opticalFlowConfidence;
exports.acceptFallbackFrame = acceptFallbackFrame;
const math_1 = require("./math");
function roiFromPose(frame) {
    if (!frame.landmarks.length)
        return { x: 0, y: 0, width: 1, height: 1 };
    const xs = frame.landmarks.map(p => p.x);
    const ys = frame.landmarks.map(p => p.y);
    const minX = Math.max(0, Math.min(...xs) - 0.08);
    const maxX = Math.min(1, Math.max(...xs) + 0.08);
    const minY = Math.max(0, Math.min(...ys) - 0.08);
    const maxY = Math.min(1, Math.max(...ys) + 0.08);
    return { x: minX, y: minY, width: Math.max(0.05, maxX - minX), height: Math.max(0.05, maxY - minY) };
}
function opticalFlowConfidence(points) {
    if (!points.length)
        return 0;
    const meanConfidence = points.reduce((sum, p) => sum + p.confidence, 0) / points.length;
    return (0, math_1.clamp01)(meanConfidence);
}
function acceptFallbackFrame(flowConfidence, poseConfidence, threshold = 0.55) {
    return (0, math_1.clamp01)(0.45 * flowConfidence + 0.55 * poseConfidence) >= threshold;
}
