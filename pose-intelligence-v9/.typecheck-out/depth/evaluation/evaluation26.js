"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEvaluation26 = runEvaluation26;
exports.featureEvaluation26 = featureEvaluation26;
const math_1 = require("../../math");
function runEvaluation26(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=evaluation`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'evaluation:evaluation26', score, confidence, notes };
}
function featureEvaluation26(frames) { const r = runEvaluation26(frames); return { name: 'evaluation26', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
