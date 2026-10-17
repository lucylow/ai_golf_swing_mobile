"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const explainability_1 = require("../src/explainability");
const patterns_1 = require("../src/patterns");
function run() { const p = (0, patterns_1.sway)((0, fixture_1.makeFrames)()); const i = (0, explainability_1.explain)(p, []); (0, assert_1.assert)(!!i, "insight"); }
