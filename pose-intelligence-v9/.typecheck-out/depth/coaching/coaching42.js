"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCoaching42 = runCoaching42;
exports.featureCoaching42 = featureCoaching42;
const math_1 = require("../../math");
function runCoaching42(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=coaching`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'coaching:coaching42', score, confidence, notes };
}
function featureCoaching42(frames) { const r = runCoaching42(frames); return { name: 'coaching42', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
