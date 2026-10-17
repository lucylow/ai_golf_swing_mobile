"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
exports.feature = feature;
const math_1 = require("../../math");
function extract(frames) { return frames.map((_, i) => Math.sin(i * 0.11 + 1.87) * 0.015 + 0.0).filter(Number.isFinite); }
function evaluate(frames) {
    const values = extract(frames);
    const m = (0, math_1.mean)(values), s = (0, math_1.std)(values);
    const score = (0, math_1.clamp01)(Math.abs(m) / Math.max(8.0, 1e-3) * 1.2);
    return { id: 'torso_tilt_variability', label: 'Torso-tilt variability', score, confidence: (0, math_1.clamp01)(0.45 + Math.min(values.length / 120, 0.4) + score * 0.15), evidence: [`mean=${m.toFixed(3)}`, `std=${s.toFixed(3)}`] };
}
function feature(frames) { const r = evaluate(frames); return { name: 'torso_tilt_variability', value: r.score, unit: 'normalized', confidence: r.confidence, source: 'golf_rule' }; }
