"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCoaching15 = runCoaching15;
exports.featureCoaching15 = featureCoaching15;
const math_1 = require("../../math");
function runCoaching15(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=coaching`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'coaching:coaching15', score, confidence, notes };
}
function featureCoaching15(frames) { const r = runCoaching15(frames); return { name: 'coaching15', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
