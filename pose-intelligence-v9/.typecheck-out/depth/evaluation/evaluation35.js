"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEvaluation35 = runEvaluation35;
exports.featureEvaluation35 = featureEvaluation35;
const math_1 = require("../../math");
function runEvaluation35(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=evaluation`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'evaluation:evaluation35', score, confidence, notes };
}
function featureEvaluation35(frames) { const r = runEvaluation35(frames); return { name: 'evaluation35', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
