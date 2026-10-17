"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const quality_1 = require("../src/quality");
function run() { (0, assert_1.assert)((0, quality_1.frameQuality)((0, fixture_1.makeFrame)(1)) > 0.5, "frame quality"); }
