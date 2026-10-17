"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributionShift = distributionShift;
exports.driftFlag = driftFlag;
const math_1 = require("../math");
function distributionShift(reference, current) { const a = (0, math_1.mean)(reference), b = (0, math_1.mean)(current); const sa = reference.length ? Math.sqrt((0, math_1.mean)(reference.map(v => (v - a) ** 2))) : 1; return Math.abs(a - b) / Math.max(sa, 1e-6); }
function driftFlag(reference, current, threshold = 2) { return distributionShift(reference, current) > threshold; }
