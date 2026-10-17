"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATTERNRECORD_FIELDS = void 0;
exports.validatePatternrecord = validatePatternrecord;
exports.PATTERNRECORD_FIELDS = 'swing_id,pattern,score,confidence,evidence'.split(',');
function validatePatternrecord(row) { const missing = []; for (const f of exports.PATTERNRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
