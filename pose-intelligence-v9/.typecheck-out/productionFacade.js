"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionGolfAI = void 0;
const algorithmV9_1 = require("./algorithmV9");
const types_1 = require("./types");
const nativeAdapter_1 = require("./nativeAdapter");
class ProductionGolfAI {
    constructor(config = types_1.defaultConfig) { this.algorithm = new algorithmV9_1.GolfPoseAlgorithmV9(config); }
    analyzeFrames(frames) { return this.algorithm.analyze(frames); }
    analyzeNative(results, runtime = 'mediapipe') { const frames = results.map((r, i) => { const p = (0, nativeAdapter_1.mapNativeResult)(r, runtime, 0); return { timestampMs: p.timestampMs, frameIndex: i, width: r.width, height: r.height, landmarks: p.landmarks, detectionConfidence: p.detectionConfidence, trackingConfidence: p.trackingConfidence }; }); return this.algorithm.analyze(frames); }
}
exports.ProductionGolfAI = ProductionGolfAI;
