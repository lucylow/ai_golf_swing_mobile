"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuality21 = runQuality21;
exports.featureQuality21 = featureQuality21;
const math_1 = require("../../math");
function runQuality21(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=quality`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'quality:quality21', score, confidence, notes };
}
function featureQuality21(frames) { const r = runQuality21(frames); return { name: 'quality21', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
