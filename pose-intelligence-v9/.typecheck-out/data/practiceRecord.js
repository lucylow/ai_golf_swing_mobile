"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRACTICERECORD_FIELDS = void 0;
exports.validatePracticerecord = validatePracticerecord;
exports.PRACTICERECORD_FIELDS = 'session_id,drill_id,reps,success_rate,fatigue,mastery'.split(',');
function validatePracticerecord(row) { const missing = []; for (const f of exports.PRACTICERECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
