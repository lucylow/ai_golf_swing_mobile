"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.velocity = velocity;
exports.acceleration = acceleration;
exports.pointSeries = pointSeries;
exports.motionSignals = motionSignals;
exports.segmentAngle = segmentAngle;
exports.peakVelocity = peakVelocity;
exports.meanAngle = meanAngle;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function velocity(a, b, dtMs) { const dt = Math.max(dtMs / 1000, 1e-3); return (0, math_1.mul3)((0, math_1.sub3)(b, a), 1 / dt); }
function acceleration(a, b, dtMs) { return velocity(a, b, dtMs); }
function pointSeries(frames, id) { const out = []; for (const f of frames) {
    const p = (0, landmarks_1.get)(f, id);
    if (p)
        out.push({ x: p.x, y: p.y, z: p.z });
} return out; }
function motionSignals(frames, id) { const out = []; for (let i = 0; i < frames.length; i++) {
    const cur = (0, landmarks_1.get)(frames[i], id);
    if (!cur)
        continue;
    const prev = (0, landmarks_1.get)(frames[Math.max(0, i - 1)], id) ?? cur;
    const prev2 = (0, landmarks_1.get)(frames[Math.max(0, i - 2)], id) ?? prev;
    const dt = frames[i].timestampMs - frames[Math.max(0, i - 1)].timestampMs;
    const dt2 = frames[Math.max(0, i - 1)].timestampMs - frames[Math.max(0, i - 2)].timestampMs;
    const v = velocity(prev, cur, dt);
    const v0 = velocity(prev2, prev, dt2);
    const a = acceleration(v0, v, dt);
    out.push({ name: `landmark_${id}`, position: cur, velocity: v, acceleration: a, confidence: cur.confidence });
} return out; }
function segmentAngle(frames, a, b, c) { return frames.map(f => { const pa = (0, landmarks_1.get)(f, a), pb = (0, landmarks_1.get)(f, b), pc = (0, landmarks_1.get)(f, c); return pa && pb && pc ? (0, math_1.angleDeg)((0, math_1.sub3)(pa, pb), (0, math_1.sub3)(pc, pb)) : 0; }); }
function peakVelocity(signals) { return signals.reduce((m, s) => Math.max(m, Math.hypot(s.velocity.x, s.velocity.y, s.velocity.z)), 0); }
function meanAngle(values) { return (0, math_1.mean)(values.filter(v => Number.isFinite(v))); }
