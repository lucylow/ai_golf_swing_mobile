"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTelemetry43 = runTelemetry43;
exports.featureTelemetry43 = featureTelemetry43;
const math_1 = require("../../math");
function runTelemetry43(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=telemetry`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'telemetry:telemetry43', score, confidence, notes };
}
function featureTelemetry43(frames) { const r = runTelemetry43(frames); return { name: 'telemetry43', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
