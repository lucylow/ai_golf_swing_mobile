"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBiomechanics01 = runBiomechanics01;
exports.featureBiomechanics01 = featureBiomechanics01;
const math_1 = require("../../math");
function runBiomechanics01(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=biomechanics`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'biomechanics:biomechanics01', score, confidence, notes };
}
function featureBiomechanics01(frames) { const r = runBiomechanics01(frames); return { name: 'biomechanics01', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
