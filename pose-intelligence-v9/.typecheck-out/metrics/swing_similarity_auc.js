"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreSwing_Similarity_Auc = scoreSwing_Similarity_Auc;
function scoreSwing_Similarity_Auc(value, target, direction = 'up') { const raw = direction === 'up' ? value / Math.max(target, 1e-6) : target / Math.max(value, 1e-6); return Math.max(0, Math.min(1, 0.5 + 0.5 * Math.tanh(raw - 1))); }
