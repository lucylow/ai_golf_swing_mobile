"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapNativeResult = mapNativeResult;
const confidence_1 = require("./confidence");
function mapNativeResult(result, runtime, latencyMs) { const landmarks = result.landmarks.map((p, i) => ({ id: i, x: p.x, y: p.y, z: p.z, visibility: p.visibility ?? p.score ?? 1, confidence: (0, confidence_1.combineConfidence)(p.score ?? 1, p.visibility ?? 1, p.presence ?? 1), presence: p.presence })); return { runtime, timestampMs: result.timestampMs, landmarks, latencyMs, detectionConfidence: landmarks.reduce((a, b) => a + b.confidence, 0) / Math.max(1, landmarks.length), trackingConfidence: landmarks.reduce((a, b) => a + b.visibility, 0) / Math.max(1, landmarks.length) }; }
