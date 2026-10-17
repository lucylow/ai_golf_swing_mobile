"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const algorithmV9_1 = require("../src/algorithmV9");
function run() { const r = new algorithmV9_1.GolfPoseAlgorithmV9().analyze((0, fixture_1.makeFrames)(90)); (0, assert_1.assert)(r.features.length > 0, "algorithm"); }
