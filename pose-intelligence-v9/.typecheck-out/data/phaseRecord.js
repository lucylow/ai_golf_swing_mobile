"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHASERECORD_FIELDS = void 0;
exports.validatePhaserecord = validatePhaserecord;
exports.PHASERECORD_FIELDS = 'swing_id,phase,start_ms,end_ms,confidence'.split(',');
function validatePhaserecord(row) { const missing = []; for (const f of exports.PHASERECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
