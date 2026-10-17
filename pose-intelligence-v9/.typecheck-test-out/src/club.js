"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handToClubProxy = handToClubProxy;
exports.proxyClubPath = proxyClubPath;
exports.clubPathFeature = clubPathFeature;
const landmarks_1 = require("./landmarks");
const math_1 = require("./math");
function handToClubProxy(frame) { const wrist = (0, landmarks_1.get)(frame, landmarks_1.MP33.RIGHT_WRIST), elbow = (0, landmarks_1.get)(frame, landmarks_1.MP33.RIGHT_ELBOW); if (!wrist || !elbow)
    return null; const shaft = { x: wrist.x - elbow.x, y: wrist.y - elbow.y }; return { shaft, confidence: (0, math_1.clamp01)(wrist.confidence * 0.7 + elbow.confidence * 0.3), length: Math.hypot(shaft.x, shaft.y), timestampMs: frame.timestampMs }; }
function proxyClubPath(frames) { const lines = frames.map(handToClubProxy).filter(Boolean); const out = [0]; for (let i = 1; i < lines.length; i++)
    out.push((0, math_1.signedAngle2)(lines[i - 1].shaft, lines[i].shaft)); return out; }
function clubPathFeature(frames) { const p = proxyClubPath(frames); return { name: 'proxy_club_path', value: (0, math_1.mean)(p.slice(1).map(v => Math.abs(v))), unit: 'deg/frame', confidence: (0, math_1.clamp01)(p.length / Math.max(frames.length, 1) * 0.75), source: 'hand_club_proxy' }; }
