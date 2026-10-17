"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEvaluation44 = runEvaluation44;
exports.featureEvaluation44 = featureEvaluation44;
const math_1 = require("../../math");
function runEvaluation44(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=evaluation`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'evaluation:evaluation44', score, confidence, notes };
}
function featureEvaluation44(frames) { const r = runEvaluation44(frames); return { name: 'evaluation44', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
