"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const realtime_1 = require("../src/realtime");
function run() { const q = new realtime_1.FrameScheduler(2); q.push({ runtime: "mock", timestampMs: 1, landmarks: [], latencyMs: 1, detectionConfidence: 1, trackingConfidence: 1 }); (0, assert_1.assert)(q.size() === 1, "scheduler"); }
