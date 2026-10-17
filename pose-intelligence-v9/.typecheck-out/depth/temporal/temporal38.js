"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTemporal38 = runTemporal38;
exports.featureTemporal38 = featureTemporal38;
const math_1 = require("../../math");
function runTemporal38(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=temporal`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'temporal:temporal38', score, confidence, notes };
}
function featureTemporal38(frames) { const r = runTemporal38(frames); return { name: 'temporal38', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
