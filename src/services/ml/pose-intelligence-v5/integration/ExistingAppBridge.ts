import { PoseFrame } from '../types/landmarks';
import { AdvancedPosePipeline, AdvancedPipelineResult } from '../pipeline/advancedPosePipeline';
import { PosePipelineConfig, defaultPosePipelineConfig } from '../types/config';

export type ExistingAppBridgeOptions={config?:PosePipelineConfig;onQualityWarning?:(reason:string)=>void};
export class ExistingAppBridge{
 private readonly pipeline:AdvancedPosePipeline;
 constructor(private readonly options:ExistingAppBridgeOptions={}){this.pipeline=new AdvancedPosePipeline(options.config??defaultPosePipelineConfig);}
 analyze(frames:PoseFrame[]):AdvancedPipelineResult{
  const result=this.pipeline.run(frames);
  if(!result.accepted)this.options.onQualityWarning?.(result.qualityReason);
  return result;
 }
}
