"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const realtime_1 = require("../src/realtime");
function run() { const m = new realtime_1.LatencyMonitor(); m.add(10); m.add(20); (0, assert_1.assert)(m.p95() >= 10, "latency"); }
