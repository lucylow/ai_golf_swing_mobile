"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANNOTATIONRECORD_FIELDS = void 0;
exports.validateAnnotationrecord = validateAnnotationrecord;
exports.ANNOTATIONRECORD_FIELDS = 'frame_index,phase,label,annotator_id,confidence'.split(',');
function validateAnnotationrecord(row) { const missing = []; for (const f of exports.ANNOTATIONRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
