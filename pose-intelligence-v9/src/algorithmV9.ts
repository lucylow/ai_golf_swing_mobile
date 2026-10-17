import { PoseFrame, PosePipelineConfig, SwingAnalysis, SwingEvent, FeatureValue, PatternHypothesis } from './types';
import { defaultConfig } from './types';
import { smoothSequence } from './smoothing';
import { repairGaps } from './gapRepair';
import { resampleFrames } from './temporal';
import { assessSequence } from './quality';
import { detectEvents, phasesFromEvents } from './phase';
import { keyGolfFeatures } from './golfKinematics';
import { clubPathFeature } from './club';
import { earlyExtension, sway } from './patterns';
import { explain } from './explainability';
import { clamp01 } from './math';
export class GolfPoseAlgorithmV9 {
  constructor(private readonly config:PosePipelineConfig=defaultConfig){}
  analyze(input:PoseFrame[]):SwingAnalysis{if(input.length<this.config.minFrames)return{quality:{score:0,accepted:false,reasons:['insufficient_frames']},events:[],phases:[],features:[],patterns:[],insight:null};
    let frames=repairGaps(input,this.config.maxGapFrames);frames=resampleFrames(frames,this.config.runtime.maxFps);if(this.config.smoothing.enabled)frames=smoothSequence(frames);const q=assessSequence(frames,this.config.quality.minCoverage,this.config.quality.maxJitter);const events=detectEvents(frames);const phases=phasesFromEvents(frames,events,this.config.phase.minPhaseMs);let features:FeatureValue[]=[...keyGolfFeatures(frames),clubPathFeature(frames)];const patterns:PatternHypothesis[]=[earlyExtension(frames),sway(frames)].sort((a,b)=>b.score-a.score);const best=patterns[0]??null;const insight=explain(best,features);const accepted=q.score>=this.config.minFrameQuality&&phases.length>=3;return{quality:{score:clamp01(q.score),accepted,reasons:q.reasons},events,phases,features,patterns,insight};
  }
}

