"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectSubjectLeakage = detectSubjectLeakage;
function detectSubjectLeakage(train, validation, test) { const a = new Set(train), b = new Set(validation), c = new Set(test), leaked = []; for (const id of a)
    if (b.has(id) || c.has(id))
        leaked.push(id); for (const id of b)
    if (c.has(id))
        leaked.push(id); return { leaked: [...new Set(leaked)], pass: leaked.length === 0 }; }
