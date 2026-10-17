"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const assert_1 = require("./assert");
const fixture_1 = require("./fixture");
const runAll_1 = require("../src/rules/runAll");
const datasetSplits_1 = require("../src/data/datasetSplits");
const devicePolicy_1 = require("../src/runtime/devicePolicy");
function run() {
    const frames = (0, fixture_1.makeFrames)(90);
    const rules = (0, runAll_1.runAllRules)(frames);
    (0, assert_1.assert)(rules.length > 20, 'rule bank populated');
    const split = (0, datasetSplits_1.deterministicSplit)('demo-subject-1');
    (0, assert_1.assert)(split === 'train' || split === 'validation' || split === 'test', 'split valid');
    const tiers = ['low', 'mid', 'high'];
    const tier = tiers[frames.length % tiers.length];
    const policy = (0, devicePolicy_1.policyForClass)(tier);
    (0, assert_1.assert)(policy.targetFps >= 20 && policy.targetFps <= 30, 'runtime policy');
}
