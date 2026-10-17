"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultQuantization = void 0;
exports.chooseQuantization = chooseQuantization;
exports.defaultQuantization = { mode: 'float16', accuracyGuard: 0.97, memoryReductionTarget: 0.35 };
function chooseQuantization(deviceClass) { return deviceClass === 'low' ? { mode: 'int8', accuracyGuard: 0.94, memoryReductionTarget: 0.55 } : deviceClass === 'mid' ? exports.defaultQuantization : { mode: 'float32', accuracyGuard: 0.99, memoryReductionTarget: 0.15 }; }
