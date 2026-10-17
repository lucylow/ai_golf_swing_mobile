"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explain = explain;
const math_1 = require("./math");
function explain(pattern, features) { if (!pattern)
    return null; const related = features.filter(f => pattern.evidence.some(e => e.startsWith(f.name + '='))).map(f => f.name); const title = pattern.label; const explanation = pattern.evidence.length ? `The analysis found ${pattern.evidence[0].toLowerCase()}. This is an observed movement pattern, not a diagnosis.` : 'The analysis found a movement pattern with limited supporting evidence.'; const action = pattern.id === 'early_extension' ? 'Practice a hip-depth drill, then re-record three swings.' : pattern.id === 'sway' ? 'Use a centered-rotation drill and recheck head/pelvis stability.' : 'Repeat the recommended drill and verify the same pattern across multiple swings.'; return { title, explanation, action, confidence: (0, math_1.clamp01)(pattern.confidence), relatedFeatures: related }; }
