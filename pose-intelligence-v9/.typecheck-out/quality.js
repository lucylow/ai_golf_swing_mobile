"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameQuality = frameQuality;
exports.sequenceCoverage = sequenceCoverage;
exports.jitterScore = jitterScore;
exports.assessSequence = assessSequence;
exports.qualityEnvelope = qualityEnvelope;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function frameQuality(frame) {
    const required = landmarks_1.REQUIRED.map(id => (0, landmarks_1.get)(frame, id)).filter(Boolean);
    const visible = required.filter(l => !!l && l.confidence >= 0.45 && l.visibility >= 0.4).length / (landmarks_1.REQUIRED.length || 1);
    const conf = (0, math_1.mean)(required.map(l => l ? l.confidence : 0));
    return (0, math_1.clamp01)(0.7 * visible + 0.3 * conf);
}
function sequenceCoverage(frames) {
    if (frames.length < 2)
        return 0;
    const qualities = frames.map(frameQuality);
    return (0, math_1.clamp01)(qualities.filter(q => q >= 0.55).length / qualities.length);
}
function jitterScore(frames) {
    if (frames.length < 3)
        return 1;
    const nose = frames.map(f => (0, landmarks_1.get)(f, 0)).filter(Boolean);
    if (nose.length < 3)
        return 1;
    const step = [];
    for (let i = 1; i < nose.length; i++)
        step.push((0, math_1.distance3)(nose[i], nose[i - 1]));
    const meanStep = (0, math_1.mean)(step);
    const spikes = step.filter(v => v > Math.max(meanStep * 2, 0.08)).length;
    return (0, math_1.clamp01)(1 - spikes / Math.max(step.length, 1));
}
function assessSequence(frames, minCoverage = 0.75, maxJitter = 0.045) { const coverage = sequenceCoverage(frames), jitter = jitterScore(frames); const score = (0, math_1.clamp01)(0.55 * coverage + 0.45 * jitter); const reasons = []; if (coverage < minCoverage)
    reasons.push('insufficient_frame_coverage'); if ((1 - jitter) > maxJitter)
    reasons.push('excessive_temporal_jitter'); return { score, coverage, jitter, accepted: score >= 0.55, reasons }; }
function qualityEnvelope(frame) { return frameQuality(frame); }
