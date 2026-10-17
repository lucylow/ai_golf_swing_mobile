"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const phase_1 = require("../src/phase");
function run() { const e = (0, phase_1.detectEvents)((0, fixture_1.makeFrames)()); (0, assert_1.assert)(e.length >= 4, "events"); }
