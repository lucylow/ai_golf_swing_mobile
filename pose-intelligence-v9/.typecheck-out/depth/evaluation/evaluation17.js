"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEvaluation17 = runEvaluation17;
exports.featureEvaluation17 = featureEvaluation17;
const math_1 = require("../../math");
function runEvaluation17(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=evaluation`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'evaluation:evaluation17', score, confidence, notes };
}
function featureEvaluation17(frames) { const r = runEvaluation17(frames); return { name: 'evaluation17', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
