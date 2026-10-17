"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = assert;
exports.assertNear = assertNear;
function assert(condition, message) { if (!condition)
    throw new Error(message); }
function assertNear(actual, expected, tolerance, message) { if (Math.abs(actual - expected) > tolerance)
    throw new Error(`${message}: ${actual} not within ${tolerance} of ${expected}`); }
