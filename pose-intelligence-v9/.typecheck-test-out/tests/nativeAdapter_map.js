"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const nativeAdapter_1 = require("../src/nativeAdapter");
function run() { const r = (0, nativeAdapter_1.mapNativeResult)({ timestampMs: 1, width: 640, height: 480, landmarks: Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.5, z: 0, visibility: 0.9, presence: 0.9, score: 0.9 })) }, "mediapipe", 12); (0, assert_1.assert)(r.landmarks.length === 33, "native map"); }
