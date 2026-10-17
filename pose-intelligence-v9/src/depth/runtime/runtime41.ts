import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Runtime41Output={id:string;score:number;confidence:number;notes:string[]};
export function runRuntime41(frames:PoseFrame[]):Runtime41Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=runtime`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'runtime:runtime41',score,confidence,notes};
}
export function featureRuntime41(frames:PoseFrame[]):FeatureValue{const r=runRuntime41(frames);return{name:'runtime41',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

