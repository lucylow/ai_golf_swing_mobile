"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVICERECORD_FIELDS = void 0;
exports.validateDevicerecord = validateDevicerecord;
exports.DEVICERECORD_FIELDS = 'device_model,os_version,model_version,fps,p95_latency_ms'.split(',');
function validateDevicerecord(row) { const missing = []; for (const f of exports.DEVICERECORD_FIELDS)
    if (row[f] === undefined)
        missing.push(f); return missing; }
