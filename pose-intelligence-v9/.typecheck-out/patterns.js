"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternEvidence = patternEvidence;
exports.earlyExtension = earlyExtension;
exports.sway = sway;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function patternEvidence(frames, feature, label, id, threshold) { const score = (0, math_1.clamp01)(Math.abs(feature.value) / Math.max(threshold, 1e-3)); return { id, label, score, confidence: (0, math_1.clamp01)(0.45 * feature.confidence + 0.55 * score), evidence: [`${feature.name}=${feature.value.toFixed(2)} ${feature.unit}`] }; }
function earlyExtension(frames) { const hips = frames.map(f => { const l = (0, landmarks_1.get)(f, landmarks_1.MP33.LEFT_HIP), r = (0, landmarks_1.get)(f, landmarks_1.MP33.RIGHT_HIP); return l && r ? (l.y + r.y) / 2 : NaN; }).filter(Number.isFinite); const delta = hips.length > 1 ? hips[hips.length - 1] - hips[Math.floor(hips.length * 0.7)] : 0; return { id: 'early_extension', label: 'Early extension tendency', score: (0, math_1.clamp01)(Math.abs(delta) * 8), confidence: (0, math_1.clamp01)(0.55 + Math.abs(delta) * 2), evidence: [`pelvis_vertical_change=${delta.toFixed(3)}`] }; }
function sway(frames) { const nose = frames.map(f => (0, landmarks_1.get)(f, landmarks_1.MP33.NOSE)).filter(Boolean); if (!nose.length)
    return { id: 'sway', label: 'Lateral sway tendency', score: 0, confidence: 0, evidence: [] }; const xs = nose.map(p => p.x), m = (0, math_1.mean)(xs); const rms = Math.sqrt((0, math_1.mean)(xs.map(x => (x - m) ** 2))); return { id: 'sway', label: 'Lateral sway tendency', score: (0, math_1.clamp01)(rms * 10), confidence: (0, math_1.clamp01)(0.5 + rms * 3), evidence: [`nose_rms=${rms.toFixed(3)}`] }; }
