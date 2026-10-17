"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runData22 = runData22;
exports.featureData22 = featureData22;
const math_1 = require("../../math");
function runData22(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=data`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'data:data22', score, confidence, notes };
}
function featureData22(frames) { const r = runData22(frames); return { name: 'data22', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
