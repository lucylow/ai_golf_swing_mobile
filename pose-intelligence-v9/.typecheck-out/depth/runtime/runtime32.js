"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRuntime32 = runRuntime32;
exports.featureRuntime32 = featureRuntime32;
const math_1 = require("../../math");
function runRuntime32(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=runtime`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'runtime:runtime32', score, confidence, notes };
}
function featureRuntime32(frames) { const r = runRuntime32(frames); return { name: 'runtime32', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
