"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = summarize;
exports.winsorize = winsorize;
exports.robustWeight = robustWeight;
exports.robustConfidence = robustConfidence;
const math_1 = require("../math");
function summarize(xs, k = 3) { const m = (0, math_1.median)(xs), s = Math.max((0, math_1.mad)(xs) * 1.4826, 1e-6); return { median: m, mad: s, lower: m - k * s, upper: m + k * s, count: xs.length }; }
function winsorize(xs, k = 3) { const s = summarize(xs, k); return xs.map(v => Math.max(s.lower, Math.min(s.upper, v))); }
function robustWeight(residual, delta = 1) { const a = Math.abs(residual); return a <= delta ? 1 : delta / a; }
function robustConfidence(residuals) { if (!residuals.length)
    return 0; const s = summarize(residuals); const scale = Math.max(Math.abs(s.median) + s.mad, 1); return (0, math_1.clamp01)(1 / (1 + scale)); }
