"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFrame = makeFrame;
exports.makeFrames = makeFrames;
function makeFrame(i) { const landmarks = Array.from({ length: 33 }, (_, id) => ({ id, x: 0.5 + Math.sin(i * 0.12 + id) * 0.05, y: 0.5 + Math.cos(i * 0.11 + id) * 0.05, z: Math.sin(i * 0.07 + id) * 0.02, confidence: 0.9, visibility: 0.95 })); return { timestampMs: i * 33, frameIndex: i, width: 640, height: 480, landmarks, detectionConfidence: 0.9, trackingConfidence: 0.9 }; }
function makeFrames(n = 90) { return Array.from({ length: n }, (_, i) => makeFrame(i)); }
