"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineConfidence = combineConfidence;
exports.temporalConfidence = temporalConfidence;
exports.propagate = propagate;
const math_1 = require("./math");
function combineConfidence(detection, visibility, tracking) {
    const d = (0, math_1.clamp01)(detection), v = (0, math_1.clamp01)(visibility), t = (0, math_1.clamp01)(tracking);
    return (0, math_1.clamp01)(0.40 * d + 0.20 * v + 0.40 * t);
}
function temporalConfidence(samples) {
    if (!samples.length)
        return 0;
    const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
    const variance = samples.reduce((a, b) => a + (b - mean) ** 2, 0) / samples.length;
    return (0, math_1.clamp01)(mean * Math.exp(-Math.sqrt(variance)));
}
function propagate(...parts) {
    if (!parts.length)
        return 0;
    let product = 1;
    for (const p of parts)
        product *= (0, math_1.clamp01)(p);
    const geometric = Math.pow(product, 1 / parts.length);
    const arithmetic = parts.reduce((a, b) => a + (0, math_1.clamp01)(b), 0) / parts.length;
    return (0, math_1.clamp01)(0.65 * geometric + 0.35 * arithmetic);
}
