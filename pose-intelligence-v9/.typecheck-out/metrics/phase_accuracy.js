"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scorePhase_Accuracy = scorePhase_Accuracy;
function scorePhase_Accuracy(value, target, direction = 'up') { const raw = direction === 'up' ? value / Math.max(target, 1e-6) : target / Math.max(value, 1e-6); return Math.max(0, Math.min(1, 0.5 + 0.5 * Math.tanh(raw - 1))); }
