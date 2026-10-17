"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const math_1 = require("../src/math");
function run() { (0, assert_1.assert)(Number.isFinite((0, math_1.robustZ)(1, [1, 1, 2])), "robust z"); }
