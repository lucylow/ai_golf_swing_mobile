"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
exports.summary = summary;
const math_1 = require("../../math");
function evaluate(obs) { const errors = obs.map(o => o.actual - o.expected); const mae = (0, math_1.mean)(errors.map(e => Math.abs(e))); const bias = (0, math_1.mean)(errors); const quality = (0, math_1.clamp01)(1 / (1 + mae)); const alerts = []; if (mae > 0.08)
    alerts.push('mae_threshold'); if (Math.abs(bias) > 0.07)
    alerts.push('bias_threshold'); const confidence = (0, math_1.mean)(obs.map(o => o.confidence)); if (confidence < 0.55)
    alerts.push('confidence_floor'); return { mae, bias, quality, alert: alerts.length > 0, alerts }; }
function summary(m) { return m.alert ? `monitor_alert:${m.alerts.join('|')}` : `ok:quality=${m.quality.toFixed(3)}`; }
