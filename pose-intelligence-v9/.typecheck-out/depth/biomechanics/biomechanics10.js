"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBiomechanics10 = runBiomechanics10;
exports.featureBiomechanics10 = featureBiomechanics10;
const math_1 = require("../../math");
function runBiomechanics10(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=biomechanics`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'biomechanics:biomechanics10', score, confidence, notes };
}
function featureBiomechanics10(frames) { const r = runBiomechanics10(frames); return { name: 'biomechanics10', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
