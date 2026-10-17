"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const math_1 = require("../src/math");
function run() { (0, assert_1.assert)((0, math_1.clamp)(2, 0, 1) === 1, "clamp"); }
