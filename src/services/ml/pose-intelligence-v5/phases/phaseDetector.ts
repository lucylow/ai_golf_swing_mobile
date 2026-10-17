import { PoseFrame } from '../types/landmarks';
import { PhaseWindow, SwingPhaseName } from '../types/model';
import { PosePipelineConfig } from '../types/config';
import { buildSwingSignal } from './swingSignal';
import { mean } from '../math/scalar';

export class HeuristicSwingPhaseDetector {
  constructor(private readonly config:PosePipelineConfig){}

  detect(frames:PoseFrame[]):PhaseWindow[]{
    if(frames.length<6) return [{phase:'unknown',startFrame:0,endFrame:Math.max(0,frames.length-1),startMs:frames[0]?.timestampMs??0,endMs:frames.at(-1)?.timestampMs??0,confidence:0}];
    const signal=buildSwingSignal(frames);
    const peakIndex=signal.normalizedEnergy.indexOf(Math.max(...signal.normalizedEnergy));
    const topIndex=findTop(signal.wristHeight);
    const start=0;
    const impact=Math.min(frames.length-1,Math.max(topIndex+2,peakIndex));
    const finish=frames.length-1;
    const points=[
      ['setup',start,Math.min(3,Math.max(start+1,Math.floor(frames.length*0.08)))],
      ['takeaway',Math.floor(frames.length*0.08),Math.floor(frames.length*0.2)],
      ['backswing',Math.floor(frames.length*0.2),Math.max(Math.floor(frames.length*0.45),topIndex-2)],
      ['top',Math.max(0,topIndex-1),Math.min(frames.length-1,topIndex+1)],
      ['transition',Math.min(frames.length-1,topIndex+1),Math.min(frames.length-1,topIndex+Math.max(3,Math.floor(frames.length*0.08)))],
      ['downswing',Math.min(frames.length-1,topIndex+Math.max(3,Math.floor(frames.length*0.08))),Math.max(0,impact-2)],
      ['impact',Math.max(0,impact-2),Math.min(frames.length-1,impact+2)],
      ['release',Math.min(frames.length-1,impact+2),Math.min(frames.length-1,impact+Math.floor(frames.length*0.1))],
      ['finish',Math.min(frames.length-1,impact+Math.floor(frames.length*0.1)),finish],
    ] as [SwingPhaseName,number,number][];
    return points.map(([phase,s,e])=>({phase,startFrame:s,endFrame:e,startMs:frames[s]?.timestampMs??0,endMs:frames[e]?.timestampMs??0,confidence:Math.max(0.25,Math.min(1,0.65+mean(signal.normalizedEnergy.slice(s,e+1))*0.35))})).filter(p=>p.endFrame>=p.startFrame);
  }
}

function findTop(wristHeight:number[]):number{
  if(!wristHeight.length) return 0;
  let idx=0; let best=wristHeight[0];
  for(let i=1;i<wristHeight.length;i+=1){ if(wristHeight[i]<best){best=wristHeight[i];idx=i;} }
  return idx;
}
