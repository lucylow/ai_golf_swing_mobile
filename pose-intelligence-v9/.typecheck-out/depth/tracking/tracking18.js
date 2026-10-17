"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTracking18 = runTracking18;
exports.featureTracking18 = featureTracking18;
const math_1 = require("../../math");
function runTracking18(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=tracking`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'tracking:tracking18', score, confidence, notes };
}
function featureTracking18(frames) { const r = runTracking18(frames); return { name: 'tracking18', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
