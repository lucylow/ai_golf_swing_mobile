"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const gapRepair_1 = require("../src/gapRepair");
function run() { const fs = (0, fixture_1.makeFrames)(10); fs[5].landmarks[0].confidence = 0.01; const out = (0, gapRepair_1.repairGaps)(fs, 3); (0, assert_1.assert)(out[5].landmarks[0].confidence > 0.01, "gap repair"); }
