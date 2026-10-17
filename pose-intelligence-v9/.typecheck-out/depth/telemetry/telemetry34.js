"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTelemetry34 = runTelemetry34;
exports.featureTelemetry34 = featureTelemetry34;
const math_1 = require("../../math");
function runTelemetry34(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=telemetry`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'telemetry:telemetry34', score, confidence, notes };
}
function featureTelemetry34(frames) { const r = runTelemetry34(frames); return { name: 'telemetry34', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
