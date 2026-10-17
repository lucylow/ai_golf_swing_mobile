"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOTRECORD_FIELDS = void 0;
exports.validateShotrecord = validateShotrecord;
exports.SHOTRECORD_FIELDS = 'shot_id,club_id,carry,total,launch,spin,face,path,result'.split(',');
function validateShotrecord(row) { const missing = []; for (const f of exports.SHOTRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
