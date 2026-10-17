"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swingEmbedding = swingEmbedding;
exports.cosineSimilarity = cosineSimilarity;
exports.embeddingDistance = embeddingDistance;
const landmarks_1 = require("./landmarks");
const landmarks_2 = require("./landmarks");
const math_1 = require("./math");
function swingEmbedding(frames, dim = 64) { const raw = []; for (const f of frames) {
    const s = (0, landmarks_2.bodyScale)(f);
    for (const id of [landmarks_1.MP33.LEFT_SHOULDER, landmarks_1.MP33.RIGHT_SHOULDER, landmarks_1.MP33.LEFT_HIP, landmarks_1.MP33.RIGHT_HIP, landmarks_1.MP33.LEFT_WRIST, landmarks_1.MP33.RIGHT_WRIST]) {
        const p = (0, landmarks_1.get)(f, id);
        if (p) {
            const c = (0, math_1.sub3)(p, { x: 0.5, y: 0.5, z: 0 });
            raw.push(p.x / s, c.x / s, p.y / s, c.y / s, p.z / s);
        }
    }
} const out = Array.from({ length: dim }, () => 0); for (let i = 0; i < raw.length; i++)
    out[i % dim] += raw[i] * (1 + (i % 7) * 0.03); const n = Math.hypot(...out) || 1; return out.map(v => v / n); }
function cosineSimilarity(a, b) { const n = Math.min(a.length, b.length); let d = 0, aa = 0, bb = 0; for (let i = 0; i < n; i++) {
    d += a[i] * b[i];
    aa += a[i] * a[i];
    bb += b[i] * b[i];
} return aa && bb ? d / Math.sqrt(aa * bb) : 0; }
function embeddingDistance(a, b) { return 1 - cosineSimilarity(a, b); }
