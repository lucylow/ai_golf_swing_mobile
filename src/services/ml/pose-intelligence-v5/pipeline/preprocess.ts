import { PoseFrame } from '../types/landmarks';
import { PosePipelineConfig } from '../types/config';
import { PoseSequenceSmoother } from '../smoothing/sequence';

export class PosePreprocessor {
  private readonly smoother:PoseSequenceSmoother;
  constructor(private readonly config:PosePipelineConfig){
    this.smoother=new PoseSequenceSmoother({minCutoffHz:config.smoothing.minCutoffHz,beta:config.smoothing.beta,maxGapFrames:config.smoothing.maxGapFrames});
  }
  process(frames:PoseFrame[]):PoseFrame[]{
    if(!this.config.smoothing.enabled) return frames;
    this.smoother.reset();
    const repaired=this.smoother.repairShortGaps(frames);
    return repaired.map(f=>this.smoother.smoothFrame(f));
  }
}
