"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
exports.feature = feature;
exports.exceedsWindow = exceedsWindow;
exports.coachingHint = coachingHint;
const landmarks_1 = require("../../landmarks");
const math_1 = require("../../math");
function positions(frames) {
    return frames.map(f => (0, landmarks_1.get)(f, 12)).filter((p) => p !== null);
}
function speeds(frames) {
    const out = [];
    for (let i = 1; i < frames.length; i++) {
        const a = (0, landmarks_1.get)(frames[i - 1], 12);
        const b = (0, landmarks_1.get)(frames[i], 12);
        if (!a || !b)
            continue;
        const dt = Math.max((frames[i].timestampMs - frames[i - 1].timestampMs) / 1000, 1e-3);
        out.push((0, math_1.distance3)(a, b) / dt);
    }
    return out;
}
function analyze(frames) {
    const ps = positions(frames);
    const ss = speeds(frames);
    const energy = ss.reduce((sum, v) => sum + v * v, 0);
    const peakSpeed = ss.reduce((max, v) => Math.max(max, v), 0);
    const variability = (0, math_1.std)(ss);
    const confidence = (0, math_1.clamp01)((0, math_1.mean)(ps.map(p => p.confidence)));
    const stability = (0, math_1.clamp01)(1 / (1 + variability));
    return { landmarkId: 12, window: 6, energy, variability, peakSpeed, stability, confidence, samples: ss.length };
}
function feature(frames) {
    const r = analyze(frames);
    return { name: `temporal_12_13`, value: r.peakSpeed, unit: 'body_scale_per_s', confidence: r.confidence, source: 'temporal_motion' };
}
function exceedsWindow(report, threshold = 0.73) {
    return report.variability > threshold && report.samples >= 6;
}
function coachingHint(report) {
    if (report.confidence < 0.5)
        return 'Low landmark confidence: prioritize camera placement before changing technique.';
    if (exceedsWindow(report))
        return 'High motion variability: repeat the movement and look for consistency across swings.';
    return 'Motion signal is stable enough to combine with phase and geometry features.';
}
