"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const canonical_1 = require("../src/canonical");
function run() { const c = (0, canonical_1.canonicalize)((0, fixture_1.makeFrame)(1)); (0, assert_1.assert)(c.length === 33, "canonical"); }
