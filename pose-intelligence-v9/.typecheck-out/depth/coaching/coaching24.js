"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCoaching24 = runCoaching24;
exports.featureCoaching24 = featureCoaching24;
const math_1 = require("../../math");
function runCoaching24(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=coaching`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'coaching:coaching24', score, confidence, notes };
}
function featureCoaching24(frames) { const r = runCoaching24(frames); return { name: 'coaching24', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
