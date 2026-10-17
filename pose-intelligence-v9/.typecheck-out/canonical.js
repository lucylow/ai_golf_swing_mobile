"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalize = canonicalize;
exports.normalizeImage = normalizeImage;
exports.mirrorNormalize = mirrorNormalize;
exports.facingScore = facingScore;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function canonicalize(frame) { const c = (0, landmarks_1.torsoCenter)(frame) ?? { x: 0, y: 0, z: 0 }; const s = (0, landmarks_1.bodyScale)(frame); return frame.landmarks.map((p) => (0, math_1.mul3)((0, math_1.sub3)(p, c), 1 / s)); }
function normalizeImage(frame) { const w = Math.max(frame.width, 1), h = Math.max(frame.height, 1); const scale = Math.max(w, h); return frame.landmarks.map(p => ({ x: (p.x * w - (w / 2)) / scale, y: (p.y * h - (h / 2)) / scale, z: p.z })); }
function mirrorNormalize(points, handedness) { return handedness === 'left' ? points.map(p => ({ x: -p.x, y: p.y, z: p.z })) : points; }
function facingScore(frame) { const ls = (0, landmarks_1.get)(frame, landmarks_1.MP33.LEFT_SHOULDER), rs = (0, landmarks_1.get)(frame, landmarks_1.MP33.RIGHT_SHOULDER), lh = (0, landmarks_1.get)(frame, landmarks_1.MP33.LEFT_HIP), rh = (0, landmarks_1.get)(frame, landmarks_1.MP33.RIGHT_HIP); if (!ls || !rs || !lh || !rh)
    return 0.5; const shoulder = Math.abs(ls.x - rs.x), hip = Math.abs(lh.x - rh.x); return Math.max(0, Math.min(1, shoulder / (shoulder + hip + 1e-6))); }
