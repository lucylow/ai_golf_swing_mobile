"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const club_1 = require("../src/club");
function run() { const f = (0, club_1.clubPathFeature)((0, fixture_1.makeFrames)()); (0, assert_1.assert)(f.name === "proxy_club_path", "club"); }
