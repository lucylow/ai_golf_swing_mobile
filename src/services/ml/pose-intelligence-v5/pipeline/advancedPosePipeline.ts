import { PoseFrame } from '../types/landmarks';
import { defaultPosePipelineConfig, PosePipelineConfig } from '../types/config';
import { PoseSwingAnalyzer } from './analyzer';
import { PosePreprocessor } from './preprocess';
import { calibrateCamera } from '../calibration/camera';
import { buildSequenceQuality } from '../quality/sequenceQuality';
import { qualityGate } from '../inference/qualityGate';
import { buildInsight } from '../coaching/insight';
import { prioritizePatterns } from '../coaching/priority';
import { phaseConfidenceScore } from '../features/phaseConfidence';

export type AdvancedPipelineResult={
  analysis:ReturnType<PoseSwingAnalyzer['analyze']>;
  camera:ReturnType<typeof calibrateCamera>;
  accepted:boolean;
  qualityReason:string;
  phaseConfidence:number;
  insight:ReturnType<typeof buildInsight>;
  runtime:{frames:number;latencyMs:number};
};

export class AdvancedPosePipeline {
  private readonly preprocessor:PosePreprocessor;
  private readonly analyzer:PoseSwingAnalyzer;
  constructor(private readonly config:PosePipelineConfig=defaultPosePipelineConfig){
    this.preprocessor=new PosePreprocessor(config);
    this.analyzer=new PoseSwingAnalyzer(config);
  }

  run(frames:PoseFrame[]):AdvancedPipelineResult{
    const started=Date.now();
    const prepared=this.preprocessor.process(frames);
    const camera=calibrateCamera(prepared);
    const quality=buildSequenceQuality(prepared,this.config);
    const gate=qualityGate(quality,this.config.minFrameQuality);
    const analysis=this.analyzer.analyzePrepared(prepared,camera.view);
    analysis.patterns=prioritizePatterns(analysis.patterns);
    analysis.primaryFocus=analysis.patterns[0];
    const insight=buildInsight(analysis.primaryFocus);
    return {
      analysis,
      camera,
      accepted:gate.accept,
      qualityReason:gate.reason,
      phaseConfidence:phaseConfidenceScore(analysis.phases),
      insight,
      runtime:{frames:prepared.length,latencyMs:Date.now()-started},
    };
  }
}
