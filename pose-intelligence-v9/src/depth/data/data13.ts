import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Data13Output={id:string;score:number;confidence:number;notes:string[]};
export function runData13(frames:PoseFrame[]):Data13Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=data`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'data:data13',score,confidence,notes};
}
export function featureData13(frames:PoseFrame[]):FeatureValue{const r=runData13(frames);return{name:'data13',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

