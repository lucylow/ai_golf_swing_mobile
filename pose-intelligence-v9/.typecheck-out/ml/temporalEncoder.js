"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.temporalPooling = temporalPooling;
exports.deltaEncoding = deltaEncoding;
const math_1 = require("../math");
function temporalPooling(sequence) { if (!sequence.length)
    return []; const d = Math.max(...sequence.map(x => x.length)); const out = []; for (let j = 0; j < d; j++) {
    const col = sequence.map(x => x[j] ?? 0);
    out.push((0, math_1.mean)(col));
} return out; }
function deltaEncoding(sequence) { const out = []; for (let i = 0; i < sequence.length; i++) {
    const a = sequence[Math.max(0, i - 1)], b = sequence[i];
    out.push(b.map((v, j) => (0, math_1.clamp01)((v - (a[j] ?? v)) * 0.5 + 0.5)));
} return out; }
