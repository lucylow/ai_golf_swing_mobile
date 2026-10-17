"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const embedding_1 = require("../src/embedding");
function run() { const e = (0, embedding_1.swingEmbedding)((0, fixture_1.makeFrames)()); (0, assert_1.assert)(Math.abs(Math.hypot(...e) - 1) < 1e-6, "embedding norm"); }
