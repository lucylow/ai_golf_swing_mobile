"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTelemetry25 = runTelemetry25;
exports.featureTelemetry25 = featureTelemetry25;
const math_1 = require("../../math");
function runTelemetry25(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=telemetry`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'telemetry:telemetry25', score, confidence, notes };
}
function featureTelemetry25(frames) { const r = runTelemetry25(frames); return { name: 'telemetry25', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
