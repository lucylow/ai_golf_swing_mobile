"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreQuality_Accept_Rate = scoreQuality_Accept_Rate;
function scoreQuality_Accept_Rate(value, target, direction = 'up') { const raw = direction === 'up' ? value / Math.max(target, 1e-6) : target / Math.max(value, 1e-6); return Math.max(0, Math.min(1, 0.5 + 0.5 * Math.tanh(raw - 1))); }
