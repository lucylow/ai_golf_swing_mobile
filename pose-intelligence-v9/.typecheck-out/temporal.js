"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resampleFrames = resampleFrames;
exports.derivative = derivative;
const math_1 = require("./math");
function resampleFrames(frames, targetFps = 30) { if (frames.length < 2)
    return frames; const start = frames[0].timestampMs, end = frames[frames.length - 1].timestampMs, dt = 1000 / Math.max(targetFps, 1), out = []; let j = 0; for (let t = start; t <= end; t += dt) {
    while (j < frames.length - 2 && frames[j + 1].timestampMs < t)
        j++;
    const a = frames[j], b = frames[j + 1] ?? a;
    const f = (0, math_1.clamp)((t - a.timestampMs) / Math.max(b.timestampMs - a.timestampMs, 1), 0, 1);
    const landmarks = a.landmarks.map((p, i) => { const q = b.landmarks[i] ?? p; return { ...p, x: (0, math_1.lerp3)(p, q, f).x, y: (0, math_1.lerp3)(p, q, f).y, z: (0, math_1.lerp3)(p, q, f).z, confidence: p.confidence + (q.confidence - p.confidence) * f, visibility: p.visibility + (q.visibility - p.visibility) * f }; });
    out.push({ ...a, timestampMs: t, landmarks });
} return out; }
function derivative(values, timestampsMs) { const out = []; for (let i = 0; i < values.length; i++) {
    const a = values[Math.max(0, i - 1)], b = values[i], dt = Math.max((timestampsMs[i] - timestampsMs[Math.max(0, i - 1)]) / 1000, 1e-3);
    out.push((b - a) / dt);
} return out; }
