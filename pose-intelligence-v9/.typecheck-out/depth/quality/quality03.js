"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuality03 = runQuality03;
exports.featureQuality03 = featureQuality03;
const math_1 = require("../../math");
function runQuality03(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=quality`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'quality:quality03', score, confidence, notes };
}
function featureQuality03(frames) { const r = runQuality03(frames); return { name: 'quality03', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
