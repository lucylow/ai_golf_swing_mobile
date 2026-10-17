"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COURSERECORD_FIELDS = void 0;
exports.validateCourserecord = validateCourserecord;
exports.COURSERECORD_FIELDS = 'course_id,hole,par,yards,wind_speed,wind_direction,lie'.split(',');
function validateCourserecord(row) { const missing = []; for (const f of exports.COURSERECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
