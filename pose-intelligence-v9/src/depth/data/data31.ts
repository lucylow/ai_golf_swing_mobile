import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Data31Output={id:string;score:number;confidence:number;notes:string[]};
export function runData31(frames:PoseFrame[]):Data31Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=data`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'data:data31',score,confidence,notes};
}
export function featureData31(frames:PoseFrame[]):FeatureValue{const r=runData31(frames);return{name:'data31',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

