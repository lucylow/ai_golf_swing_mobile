import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Runtime14Output={id:string;score:number;confidence:number;notes:string[]};
export function runRuntime14(frames:PoseFrame[]):Runtime14Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=runtime`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'runtime:runtime14',score,confidence,notes};
}
export function featureRuntime14(frames:PoseFrame[]):FeatureValue{const r=runRuntime14(frames);return{name:'runtime14',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

