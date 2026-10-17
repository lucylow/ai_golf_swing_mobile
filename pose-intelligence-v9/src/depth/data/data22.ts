import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Data22Output={id:string;score:number;confidence:number;notes:string[]};
export function runData22(frames:PoseFrame[]):Data22Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=data`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'data:data22',score,confidence,notes};
}
export function featureData22(frames:PoseFrame[]):FeatureValue{const r=runData22(frames);return{name:'data22',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

