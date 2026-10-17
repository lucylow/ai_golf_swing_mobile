"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTracking09 = runTracking09;
exports.featureTracking09 = featureTracking09;
const math_1 = require("../../math");
function runTracking09(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=tracking`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'tracking:tracking09', score, confidence, notes };
}
function featureTracking09(frames) { const r = runTracking09(frames); return { name: 'tracking09', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
