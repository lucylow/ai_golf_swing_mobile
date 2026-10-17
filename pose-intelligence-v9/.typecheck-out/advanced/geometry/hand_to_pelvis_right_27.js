"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
exports.feature = feature;
exports.isStable = isStable;
exports.explain = explain;
const landmarks_1 = require("../../landmarks");
const math_1 = require("../../math");
const A = 15;
const B = 16;
const C = 24;
const TARGET = 25;
function sample(frame) {
    const pa = (0, landmarks_1.get)(frame, A);
    const pb = (0, landmarks_1.get)(frame, B);
    const pc = (0, landmarks_1.get)(frame, C);
    if (!pa || !pb || !pc)
        return null;
    return (0, math_1.angleDeg)((0, math_1.sub3)(pa, pb), (0, math_1.sub3)(pc, pb));
}
function collect(frames) {
    const values = [];
    for (const frame of frames) {
        const value = sample(frame);
        if (value !== null && Number.isFinite(value))
            values.push(value);
    }
    return values;
}
function analyze(frames) {
    const values = collect(frames);
    const meanDegrees = (0, math_1.mean)(values);
    const variationDegrees = (0, math_1.std)(values);
    const distance = Math.abs(meanDegrees - TARGET);
    const normalizedScore = (0, math_1.clamp01)(1 - distance / Math.max(TARGET * 1.3599999999999999, 1));
    const confidence = (0, math_1.clamp01)((values.length / Math.max(frames.length, 1)) * 0.72 + 0.28 * normalizedScore);
    const evidence = [
        `samples=${values.length}`,
        `mean_deg=${meanDegrees.toFixed(2)}`,
        `std_deg=${variationDegrees.toFixed(2)}`,
        `target_deg=${TARGET}`,
    ];
    return { id: 'hand_to_pelvis_right_27', label: 'Hand To Pelvis Right 27', meanDegrees, variationDegrees, normalizedScore, confidence, evidence };
}
function feature(frames) {
    const report = analyze(frames);
    return {
        name: report.id,
        value: report.meanDegrees,
        unit: 'deg',
        confidence: report.confidence,
        source: 'advanced_geometric_feature',
    };
}
function isStable(report, maxVariation = 8.0) {
    return report.variationDegrees <= maxVariation && report.confidence >= 0.6;
}
function explain(report) {
    if (report.confidence < 0.45)
        return 'Insufficient landmark confidence for a strong coaching conclusion.';
    if (report.normalizedScore > 0.8)
        return 'The measured relationship is consistent with the current reference window.';
    if (report.variationDegrees > 8.0)
        return 'Variation is elevated across the sequence; repeat the recording with a clearer view.';
    return 'The relationship differs from the current reference window and should be interpreted with other signals.';
}
