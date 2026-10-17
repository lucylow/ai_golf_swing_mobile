"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAMERECORD_FIELDS = void 0;
exports.validateFramerecord = validateFramerecord;
exports.FRAMERECORD_FIELDS = 'frame_index,timestamp_ms,landmark_id,x,y,z,confidence,visibility'.split(',');
function validateFramerecord(row) { const missing = []; for (const f of exports.FRAMERECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
