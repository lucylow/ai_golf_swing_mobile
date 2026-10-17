"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTracking27 = runTracking27;
exports.featureTracking27 = featureTracking27;
const math_1 = require("../../math");
function runTracking27(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=tracking`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'tracking:tracking27', score, confidence, notes };
}
function featureTracking27(frames) { const r = runTracking27(frames); return { name: 'tracking27', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
