"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuality12 = runQuality12;
exports.featureQuality12 = featureQuality12;
const math_1 = require("../../math");
function runQuality12(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=quality`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'quality:quality12', score, confidence, notes };
}
function featureQuality12(frames) { const r = runQuality12(frames); return { name: 'quality12', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
