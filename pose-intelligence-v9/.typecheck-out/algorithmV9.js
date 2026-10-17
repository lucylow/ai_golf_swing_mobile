"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GolfPoseAlgorithmV9 = void 0;
const types_1 = require("./types");
const smoothing_1 = require("./smoothing");
const gapRepair_1 = require("./gapRepair");
const temporal_1 = require("./temporal");
const quality_1 = require("./quality");
const phase_1 = require("./phase");
const golfKinematics_1 = require("./golfKinematics");
const club_1 = require("./club");
const patterns_1 = require("./patterns");
const explainability_1 = require("./explainability");
const math_1 = require("./math");
class GolfPoseAlgorithmV9 {
    constructor(config = types_1.defaultConfig) {
        this.config = config;
    }
    analyze(input) {
        if (input.length < this.config.minFrames)
            return { quality: { score: 0, accepted: false, reasons: ['insufficient_frames'] }, events: [], phases: [], features: [], patterns: [], insight: null };
        let frames = (0, gapRepair_1.repairGaps)(input, this.config.maxGapFrames);
        frames = (0, temporal_1.resampleFrames)(frames, this.config.runtime.maxFps);
        if (this.config.smoothing.enabled)
            frames = (0, smoothing_1.smoothSequence)(frames);
        const q = (0, quality_1.assessSequence)(frames, this.config.quality.minCoverage, this.config.quality.maxJitter);
        const events = (0, phase_1.detectEvents)(frames);
        const phases = (0, phase_1.phasesFromEvents)(frames, events, this.config.phase.minPhaseMs);
        let features = [...(0, golfKinematics_1.keyGolfFeatures)(frames), (0, club_1.clubPathFeature)(frames)];
        const patterns = [(0, patterns_1.earlyExtension)(frames), (0, patterns_1.sway)(frames)].sort((a, b) => b.score - a.score);
        const best = patterns[0] ?? null;
        const insight = (0, explainability_1.explain)(best, features);
        const accepted = q.score >= this.config.minFrameQuality && phases.length >= 3;
        return { quality: { score: (0, math_1.clamp01)(q.score), accepted, reasons: q.reasons }, events, phases, features, patterns, insight };
    }
}
exports.GolfPoseAlgorithmV9 = GolfPoseAlgorithmV9;
