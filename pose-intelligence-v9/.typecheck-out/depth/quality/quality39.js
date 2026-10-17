"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuality39 = runQuality39;
exports.featureQuality39 = featureQuality39;
const math_1 = require("../../math");
function runQuality39(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=quality`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'quality:quality39', score, confidence, notes };
}
function featureQuality39(frames) { const r = runQuality39(frames); return { name: 'quality39', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
