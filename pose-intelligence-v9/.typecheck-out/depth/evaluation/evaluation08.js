"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEvaluation08 = runEvaluation08;
exports.featureEvaluation08 = featureEvaluation08;
const math_1 = require("../../math");
function runEvaluation08(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=evaluation`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'evaluation:evaluation08', score, confidence, notes };
}
function featureEvaluation08(frames) { const r = runEvaluation08(frames); return { name: 'evaluation08', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
