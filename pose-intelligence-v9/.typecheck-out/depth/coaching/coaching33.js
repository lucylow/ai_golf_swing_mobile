"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCoaching33 = runCoaching33;
exports.featureCoaching33 = featureCoaching33;
const math_1 = require("../../math");
function runCoaching33(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=coaching`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'coaching:coaching33', score, confidence, notes };
}
function featureCoaching33(frames) { const r = runCoaching33(frames); return { name: 'coaching33', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
