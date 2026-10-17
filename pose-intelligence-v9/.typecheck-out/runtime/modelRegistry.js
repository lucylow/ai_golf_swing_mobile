"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultModels = void 0;
exports.selectModel = selectModel;
exports.defaultModels = [
    { id: 'mediapipe-pose-landmarker', version: 'v1', runtime: 'mediapipe', inputWidth: 640, inputHeight: 480, supportsLiveStream: true, supportsWorldLandmarks: true },
    { id: 'opencv-fallback-pose', version: 'v1', runtime: 'opencv', inputWidth: 640, inputHeight: 480, supportsLiveStream: true, supportsWorldLandmarks: false },
];
function selectModel(prefer = 'mediapipe') { return exports.defaultModels.find(m => m.runtime === prefer) || exports.defaultModels[0]; }
