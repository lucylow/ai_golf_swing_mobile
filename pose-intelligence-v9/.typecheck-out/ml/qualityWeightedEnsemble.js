"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuseVotes = fuseVotes;
const math_1 = require("../math");
function fuseVotes(votes) { if (!votes.length)
    return { score: 0, confidence: 0, weights: {} }; const ws = votes.map(v => (0, math_1.clamp01)(v.confidence)); const z = ws.reduce((a, b) => a + b, 0) || 1; const weights = {}; let score = 0; votes.forEach((v, i) => { const w = ws[i] / z; weights[v.modelId] = w; score += w * v.score; }); return { score, confidence: (0, math_1.clamp01)(ws.reduce((a, b) => a + b, 0) / votes.length), weights }; }
