"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeLogger = void 0;
exports.redact = redact;
const SECRET_KEYS = ['token', 'authorization', 'apiKey', 'email', 'phone'];
function redact(properties) { const out = {}; for (const [k, v] of Object.entries(properties)) {
    if (SECRET_KEYS.some(s => k.toLowerCase().includes(s.toLowerCase())))
        out[k] = '[REDACTED]';
    else if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null)
        out[k] = v;
    else
        out[k] = '[OBJECT]';
} return out; }
class SafeLogger {
    constructor() {
        this.events = [];
    }
    track(event, properties = {}) { this.events.push({ event, timestampMs: Date.now(), properties: redact(properties) }); if (this.events.length > 500)
        this.events.shift(); }
    flush() { const out = [...this.events]; this.events = []; return out; }
}
exports.SafeLogger = SafeLogger;
