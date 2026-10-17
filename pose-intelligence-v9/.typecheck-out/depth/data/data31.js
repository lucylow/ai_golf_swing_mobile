"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runData31 = runData31;
exports.featureData31 = featureData31;
const math_1 = require("../../math");
function runData31(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=data`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'data:data31', score, confidence, notes };
}
function featureData31(frames) { const r = runData31(frames); return { name: 'data31', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
