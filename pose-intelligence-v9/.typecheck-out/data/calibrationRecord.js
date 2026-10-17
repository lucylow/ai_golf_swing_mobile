"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALIBRATIONRECORD_FIELDS = void 0;
exports.validateCalibrationrecord = validateCalibrationrecord;
exports.CALIBRATIONRECORD_FIELDS = 'device_id,metric,app_value,reference_value,weight,timestamp_ms'.split(',');
function validateCalibrationrecord(row) { const missing = []; for (const f of exports.CALIBRATIONRECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
