"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneEuroLandmarkSmoother = void 0;
exports.smoothSequence = smoothSequence;
exports.clampLandmarks = clampLandmarks;
const math_1 = require("./math");
function alpha(cutoff, dt) { const tau = 1 / (2 * Math.PI * Math.max(cutoff, 1e-3)); return 1 / (1 + tau / Math.max(dt, 1e-3)); }
class OneEuroLandmarkSmoother {
    constructor(cutoffHz = 1.25, beta = 0.018, minCutoffHz = 0.35) {
        this.cutoffHz = cutoffHz;
        this.beta = beta;
        this.minCutoffHz = minCutoffHz;
        this.prev = null;
        this.prevDx = null;
    }
    reset() { this.prev = null; this.prevDx = null; }
    update(frame) {
        if (!this.prev) {
            this.prev = frame.landmarks.map(p => ({ ...p }));
            this.prevDx = frame.landmarks.map(p => ({ ...p, x: 0, y: 0, z: 0 }));
            return frame;
        }
        const dt = 1 / 30;
        const next = [];
        for (let i = 0; i < frame.landmarks.length; i++) {
            const p = frame.landmarks[i], q = this.prev[i] ?? p;
            const dx = (p.x - q.x) / dt, dy = (p.y - q.y) / dt, dz = (p.z - q.z) / dt;
            const speed = Math.hypot(dx, dy, dz);
            const cutoff = this.minCutoffHz + this.beta * speed;
            const a = alpha(cutoff, dt);
            next.push({ ...p, x: (0, math_1.lerp)(q.x, p.x, a), y: (0, math_1.lerp)(q.y, p.y, a), z: (0, math_1.lerp)(q.z, p.z, a) });
        }
        this.prev = next;
        return { ...frame, landmarks: next };
    }
}
exports.OneEuroLandmarkSmoother = OneEuroLandmarkSmoother;
function smoothSequence(frames, smoother = new OneEuroLandmarkSmoother()) { smoother.reset(); return frames.map(f => smoother.update(f)); }
function clampLandmarks(frame, margin = 0.04) { const m = (0, math_1.clamp)(margin, 0, 0.2); return { ...frame, landmarks: frame.landmarks.map(p => ({ ...p, x: (0, math_1.clamp)(p.x, m, 1 - m), y: (0, math_1.clamp)(p.y, m, 1 - m) })) }; }
