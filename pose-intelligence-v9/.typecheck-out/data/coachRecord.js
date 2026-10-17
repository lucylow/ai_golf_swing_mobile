"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COACHRECORD_FIELDS = void 0;
exports.validateCoachrecord = validateCoachrecord;
exports.COACHRECORD_FIELDS = 'swing_id,title,explanation,action,confidence'.split(',');
function validateCoachrecord(row) { const missing = []; for (const f of exports.COACHRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
