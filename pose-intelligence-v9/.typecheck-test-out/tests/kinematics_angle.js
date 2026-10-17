"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const kinematics_1 = require("../src/kinematics");
function run() { const a = (0, kinematics_1.segmentAngle)((0, fixture_1.makeFrames)(3), 11, 13, 15); (0, assert_1.assert)(a.length === 3, "angle"); }
