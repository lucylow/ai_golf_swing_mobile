"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const golfKinematics_1 = require("../src/golfKinematics");
function run() { const f = (0, golfKinematics_1.keyGolfFeatures)((0, fixture_1.makeFrames)()); (0, assert_1.assert)(f.length >= 5, "features"); }
