"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEvents = detectEvents;
exports.phasesFromEvents = phasesFromEvents;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function handSpeed(frames, i) { const p = (0, landmarks_1.get)(frames[Math.max(0, i - 1)], landmarks_1.MP33.RIGHT_WRIST), q = (0, landmarks_1.get)(frames[i], landmarks_1.MP33.RIGHT_WRIST); if (!p || !q)
    return 0; const dt = Math.max(frames[i].timestampMs - frames[Math.max(0, i - 1)].timestampMs, 1); return (0, math_1.distance3)(p, q) / (dt / 1000); }
function detectEvents(frames) { if (frames.length < 4)
    return []; const speeds = frames.map((_, i) => handSpeed(frames, i)); const mx = Math.max(...speeds), min = mx * 0.05; let top = 0; for (let i = 1; i < speeds.length - 1; i++) {
    if (speeds[i] < speeds[i - 1] && speeds[i] <= speeds[i + 1] && i > top)
        top = i;
} let impact = speeds.indexOf(mx); if (impact < top)
    impact = Math.max(top + 1, impact + Math.floor(frames.length * 0.08)); const idx = (p) => Math.max(0, Math.min(frames.length - 1, Math.round(p))); const points = [['address', 0], ['takeaway', 0.16], ['top', top], ['transition', Math.min(frames.length - 1, top + Math.max(1, Math.round((impact - top) * 0.22)))], ['delivery', Math.max(0, impact - 2)], ['impact', impact], ['release', Math.min(frames.length - 1, impact + Math.max(1, Math.round(frames.length * 0.05)))], ['finish', frames.length - 1]]; return points.map(([name, i]) => ({ name: name, timestampMs: frames[idx(i)].timestampMs, frameIndex: idx(i), confidence: (0, math_1.clamp01)(0.45 + Math.min(mx / 2, 0.5)) })); }
function phasesFromEvents(frames, events, minPhaseMs = 60) { const out = []; for (let i = 0; i < events.length - 1; i++) {
    const a = events[i], b = events[i + 1];
    const duration = b.timestampMs - a.timestampMs;
    if (duration < minPhaseMs)
        continue;
    out.push({ name: a.name, timestampMs: a.timestampMs, frameIndex: a.frameIndex, confidence: (0, math_1.mean)([a.confidence, b.confidence]), startFrame: a.frameIndex, endFrame: b.frameIndex, durationMs: duration });
} return out; }
