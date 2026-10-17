"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
const landmarks_1 = require("../../landmarks");
const math_1 = require("../../math");
const IDS = [0, 11, 12, 15, 16, 23, 24, 25, 26, 27];
function evaluate(frames) {
    const frameScores = frames.map(frame => {
        const points = IDS.map(id => (0, landmarks_1.get)(frame, id)).filter(Boolean);
        const coverage = points.length / IDS.length;
        const confidence = (0, math_1.mean)(points.map(p => p?.confidence ?? 0));
        return 0.6 * coverage + 0.4 * confidence;
    });
    const score = (0, math_1.clamp01)((0, math_1.mean)(frameScores));
    const coverage = (0, math_1.clamp01)(frameScores.filter(v => v > 0.55).length / Math.max(frameScores.length, 1));
    const confidence = (0, math_1.clamp01)((0, math_1.mean)(frameScores));
    const nose = frames.map(f => (0, landmarks_1.get)(f, 0)?.x ?? 0);
    const diffs = nose.slice(1).map((v, j) => Math.abs(v - nose[j]));
    const jitter = (0, math_1.std)(diffs);
    const reasons = [];
    if (coverage < 0.72)
        reasons.push('landmark_coverage_low');
    if (confidence < 0.58)
        reasons.push('confidence_low');
    if (jitter > 0.045)
        reasons.push('temporal_jitter_high');
    return { score, visibility: coverage, confidence, coverage, jitter, accepted: score >= 0.55 && coverage >= 0.72, reasons };
}
