"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const math_1 = require("../src/math");
function run() { (0, assert_1.assertNear)((0, math_1.median)([1, 3, 2]), 2, 1e-9, "median"); }
