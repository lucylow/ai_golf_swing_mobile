"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCoaching06 = runCoaching06;
exports.featureCoaching06 = featureCoaching06;
const math_1 = require("../../math");
function runCoaching06(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=coaching`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'coaching:coaching06', score, confidence, notes };
}
function featureCoaching06(frames) { const r = runCoaching06(frames); return { name: 'coaching06', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
