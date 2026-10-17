"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTelemetry16 = runTelemetry16;
exports.featureTelemetry16 = featureTelemetry16;
const math_1 = require("../../math");
function runTelemetry16(frames) {
    const signal = frames.map((f, i) => ((i + 1) * 0.013 + f.timestampMs * 0.00001) % 1);
    const score = (0, math_1.clamp01)((0, math_1.mean)(signal));
    const confidence = (0, math_1.clamp01)(1 / (1 + (0, math_1.std)(signal) + Math.abs((0, math_1.robustZ)(score, signal))));
    const notes = [`domain=telemetry`, `frames=${frames.length}`, `mean=${score.toFixed(3)}`];
    return { id: 'telemetry:telemetry16', score, confidence, notes };
}
function featureTelemetry16(frames) { const r = runTelemetry16(frames); return { name: 'telemetry16', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'depth' }; }
