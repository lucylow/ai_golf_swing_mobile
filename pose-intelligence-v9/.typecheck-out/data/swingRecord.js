"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWINGRECORD_FIELDS = void 0;
exports.validateSwingrecord = validateSwingrecord;
exports.SWINGRECORD_FIELDS = 'swing_id,session_id,club_id,camera_view,duration_ms,quality_score'.split(',');
function validateSwingrecord(row) { const missing = []; for (const f of exports.SWINGRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
