"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const temporal_1 = require("../src/temporal");
function run() { const out = (0, temporal_1.resampleFrames)((0, fixture_1.makeFrames)(30), 15); (0, assert_1.assert)(out.length > 0 && out.length < 30, "resample"); }
