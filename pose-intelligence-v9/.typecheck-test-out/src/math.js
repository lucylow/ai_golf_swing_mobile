"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sigmoid = exports.robustZ = exports.std = exports.variance = exports.percentile = exports.mad = exports.median = exports.mean = exports.signedAngle2 = exports.angleDeg = exports.distance3 = exports.normalize3 = exports.norm3 = exports.cross3 = exports.dot3 = exports.mul3 = exports.sub3 = exports.add3 = exports.lerp3 = exports.lerp = exports.clamp01 = exports.clamp = void 0;
exports.linearRegression = linearRegression;
exports.softmax = softmax;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
exports.clamp = clamp;
const clamp01 = (v) => (0, exports.clamp)(Number.isFinite(v) ? v : 0, 0, 1);
exports.clamp01 = clamp01;
const lerp = (a, b, t) => a + (b - a) * t;
exports.lerp = lerp;
const lerp3 = (a, b, t) => ({ x: (0, exports.lerp)(a.x, b.x, t), y: (0, exports.lerp)(a.y, b.y, t), z: (0, exports.lerp)(a.z, b.z, t) });
exports.lerp3 = lerp3;
const add3 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
exports.add3 = add3;
const sub3 = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
exports.sub3 = sub3;
const mul3 = (a, s) => ({ x: a.x * s, y: a.y * s, z: a.z * s });
exports.mul3 = mul3;
const dot3 = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
exports.dot3 = dot3;
const cross3 = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
exports.cross3 = cross3;
const norm3 = (a) => Math.hypot(a.x, a.y, a.z);
exports.norm3 = norm3;
const normalize3 = (a) => { const n = (0, exports.norm3)(a); return n < 1e-9 ? { x: 0, y: 0, z: 0 } : (0, exports.mul3)(a, 1 / n); };
exports.normalize3 = normalize3;
const distance3 = (a, b) => (0, exports.norm3)((0, exports.sub3)(a, b));
exports.distance3 = distance3;
const angleDeg = (a, b) => { const na = (0, exports.norm3)(a), nb = (0, exports.norm3)(b); if (na < 1e-9 || nb < 1e-9)
    return 0; return Math.acos((0, exports.clamp)((0, exports.dot3)(a, b) / (na * nb), -1, 1)) * 180 / Math.PI; };
exports.angleDeg = angleDeg;
const signedAngle2 = (a, b) => Math.atan2(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y) * 180 / Math.PI;
exports.signedAngle2 = signedAngle2;
const mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
exports.mean = mean;
const median = (xs) => { if (!xs.length)
    return 0; const s = [...xs].sort((a, b) => a - b), m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
exports.median = median;
const mad = (xs) => { const m = (0, exports.median)(xs); return (0, exports.median)(xs.map(x => Math.abs(x - m))); };
exports.mad = mad;
const percentile = (xs, p) => { if (!xs.length)
    return 0; const s = [...xs].sort((a, b) => a - b), i = (0, exports.clamp)(p, 0, 1) * (s.length - 1), lo = Math.floor(i), hi = Math.ceil(i); return s[lo] + (s[hi] - s[lo]) * (i - lo); };
exports.percentile = percentile;
const variance = (xs) => { if (xs.length < 2)
    return 0; const m = (0, exports.mean)(xs); return xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1); };
exports.variance = variance;
const std = (xs) => Math.sqrt((0, exports.variance)(xs));
exports.std = std;
const robustZ = (v, xs) => { const m = (0, exports.median)(xs), s = Math.max((0, exports.mad)(xs) * 1.4826, 1e-6); return (v - m) / s; };
exports.robustZ = robustZ;
const sigmoid = (x) => 1 / (1 + Math.exp(-(0, exports.clamp)(x, -40, 40)));
exports.sigmoid = sigmoid;
function linearRegression(x, y, lambda = 0.001) { const n = Math.min(x.length, y.length); if (n < 2)
    return { intercept: 0, scale: 1 }; let sx = 0, sy = 0, sxx = 0, sxy = 0; for (let i = 0; i < n; i++) {
    sx += x[i];
    sy += y[i];
    sxx += x[i] * x[i];
    sxy += x[i] * y[i];
} const det = n * (sxx + lambda) - sx * sx; if (Math.abs(det) < 1e-9)
    return { intercept: sy / n, scale: 1 }; return { intercept: ((sy * (sxx + lambda)) - sx * sxy) / det, scale: ((n * sxy) - sx * sy) / det }; }
function softmax(xs) { const mx = Math.max(...xs); const ex = xs.map(v => Math.exp((0, exports.clamp)(v - mx, -30, 30))); const z = ex.reduce((a, b) => a + b, 0) || 1; return ex.map(v => v / z); }
