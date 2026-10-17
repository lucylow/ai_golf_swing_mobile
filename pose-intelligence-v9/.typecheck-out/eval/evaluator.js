"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatePrediction = evaluatePrediction;
function evaluatePrediction(pred, truth) { const warnings = []; if (!truth)
    return { metrics: { quality: pred.quality.score, events: pred.events.length, phases: pred.phases.length, patterns: pred.patterns.length }, warnings: ['no_ground_truth'] }; const eventMae = pred.events.length && truth.events.length ? Math.abs(pred.events[pred.events.length - 1].timestampMs - truth.events[truth.events.length - 1].timestampMs) : Infinity; const phaseCount = Math.min(pred.phases.length, truth.phases.length); return { metrics: { quality: pred.quality.score, event_mae_ms: Number.isFinite(eventMae) ? eventMae : 9999, phase_coverage: phaseCount / Math.max(truth.phases.length, 1) }, warnings }; }
