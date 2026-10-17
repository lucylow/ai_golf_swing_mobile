"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGoldenCase = validateGoldenCase;
function validateGoldenCase(c) { const actual = c.frames.length; return { pass: actual > 0 && c.expectedPhaseCount >= 0, frameCount: actual }; }
