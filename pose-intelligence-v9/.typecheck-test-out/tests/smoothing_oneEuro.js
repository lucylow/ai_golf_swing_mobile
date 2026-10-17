"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const smoothing_1 = require("../src/smoothing");
function run() { const s = new smoothing_1.OneEuroLandmarkSmoother(); const a = s.update((0, fixture_1.makeFrame)(0)), b = s.update((0, fixture_1.makeFrame)(1)); (0, assert_1.assert)(a.landmarks.length === b.landmarks.length, "smoothing"); }
