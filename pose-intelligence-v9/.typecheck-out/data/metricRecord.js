"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METRICRECORD_FIELDS = void 0;
exports.validateMetricrecord = validateMetricrecord;
exports.METRICRECORD_FIELDS = 'swing_id,metric,value,unit,confidence,source'.split(',');
function validateMetricrecord(row) { const missing = []; for (const f of exports.METRICRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
