import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Runtime23Output={id:string;score:number;confidence:number;notes:string[]};
export function runRuntime23(frames:PoseFrame[]):Runtime23Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=runtime`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'runtime:runtime23',score,confidence,notes};
}
export function featureRuntime23(frames:PoseFrame[]):FeatureValue{const r=runRuntime23(frames);return{name:'runtime23',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

