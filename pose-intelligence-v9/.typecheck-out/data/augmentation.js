"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.augmentFrame = augmentFrame;
function augmentFrame(frame, c) { let s = c.scaleMin + (c.scaleMax - c.scaleMin) * ((c.seed % 1000) / 1000), dx = c.translation * ((c.seed % 17) - 8) / 8, dy = c.translation * ((c.seed % 13) - 6) / 6; return { ...frame, landmarks: frame.landmarks.map((p, i) => { const drop = ((c.seed + i * 17) % 1000) / 1000 < c.dropoutProbability; const x = (c.mirror ? -p.x : p.x) * s + dx; const y = p.y * s + dy; return { ...p, x, y, confidence: drop ? p.confidence * 0.25 : p.confidence }; }) }; }
