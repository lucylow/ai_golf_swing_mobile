"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
exports.gate = gate;
const math_1 = require("../../math");
const landmarks_1 = require("../../landmarks");
function signal(frames) {
    const out = [];
    for (const frame of frames) {
        const a = (0, landmarks_1.get)(frame, 11);
        const b = (0, landmarks_1.get)(frame, 12);
        const c = (0, landmarks_1.get)(frame, 23);
        const d = (0, landmarks_1.get)(frame, 24);
        if (!a || !b || !c || !d)
            continue;
        out.push((a.x - b.x) + (c.y - d.y) + Math.sin(frame.timestampMs * 0.3));
    }
    return out;
}
function analyze(frames) {
    const values = signal(frames);
    const turns = [];
    for (let i = 1; i < values.length - 1; i++) {
        const left = values[i - 1], cur = values[i], right = values[i + 1];
        if ((cur - left) * (right - cur) < 0)
            turns.push(i);
    }
    const energy = (0, math_1.mean)(values.map(v => Math.abs(v)));
    const variability = (0, math_1.std)(values);
    const score = (0, math_1.clamp01)(1 / (1 + variability + Math.abs(energy)));
    const confidence = (0, math_1.clamp01)(values.length / Math.max(frames.length, 1));
    return { id: 'sequence_model_14', window: 13, score, confidence, turningPoints: turns.slice(0, 24), notes: [`samples=${values.length}`, `turns=${turns.length}`] };
}
function gate(result, minimumConfidence = 0.55) {
    return result.confidence >= minimumConfidence && result.turningPoints.length > 1;
}
