"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angleFeature = angleFeature;
exports.distanceFeature = distanceFeature;
exports.keyGolfFeatures = keyGolfFeatures;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function angleFeature(name, frames, a, b, c, unit = 'deg') { const vals = frames.map(f => { const pa = (0, landmarks_1.get)(f, a), pb = (0, landmarks_1.get)(f, b), pc = (0, landmarks_1.get)(f, c); return pa && pb && pc ? (0, math_1.angleDeg)((0, math_1.sub3)(pa, pb), (0, math_1.sub3)(pc, pb)) : NaN; }).filter(Number.isFinite); return { name, value: (0, math_1.mean)(vals), unit, confidence: (0, math_1.clamp01)(vals.length / Math.max(frames.length, 1)), source: 'pose_geometry' }; }
function distanceFeature(name, frames, a, b, unit = 'body_scale') { const vals = frames.map(f => { const pa = (0, landmarks_1.get)(f, a), pb = (0, landmarks_1.get)(f, b); return pa && pb ? (0, math_1.distance3)(pa, pb) : NaN; }).filter(Number.isFinite); return { name, value: (0, math_1.mean)(vals), unit, confidence: (0, math_1.clamp01)(vals.length / Math.max(frames.length, 1)), source: 'pose_geometry' }; }
function keyGolfFeatures(frames) {
    return [
        angleFeature('lead_elbow_angle', frames, landmarks_1.MP33.LEFT_SHOULDER, landmarks_1.MP33.LEFT_ELBOW, landmarks_1.MP33.LEFT_WRIST),
        angleFeature('trail_elbow_angle', frames, landmarks_1.MP33.RIGHT_SHOULDER, landmarks_1.MP33.RIGHT_ELBOW, landmarks_1.MP33.RIGHT_WRIST),
        angleFeature('lead_knee_angle', frames, landmarks_1.MP33.LEFT_HIP, landmarks_1.MP33.LEFT_KNEE, landmarks_1.MP33.LEFT_ANKLE),
        angleFeature('trail_knee_angle', frames, landmarks_1.MP33.RIGHT_HIP, landmarks_1.MP33.RIGHT_KNEE, landmarks_1.MP33.RIGHT_ANKLE),
        angleFeature('lead_shoulder_arm_angle', frames, landmarks_1.MP33.LEFT_HIP, landmarks_1.MP33.LEFT_SHOULDER, landmarks_1.MP33.LEFT_WRIST),
        angleFeature('trail_shoulder_arm_angle', frames, landmarks_1.MP33.RIGHT_HIP, landmarks_1.MP33.RIGHT_SHOULDER, landmarks_1.MP33.RIGHT_WRIST),
        distanceFeature('stance_width', frames, landmarks_1.MP33.LEFT_ANKLE, landmarks_1.MP33.RIGHT_ANKLE),
        distanceFeature('shoulder_width', frames, landmarks_1.MP33.LEFT_SHOULDER, landmarks_1.MP33.RIGHT_SHOULDER),
        distanceFeature('hip_width', frames, landmarks_1.MP33.LEFT_HIP, landmarks_1.MP33.RIGHT_HIP),
    ];
}
