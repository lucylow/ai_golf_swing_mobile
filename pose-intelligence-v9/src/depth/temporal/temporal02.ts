import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Temporal02Output={id:string;score:number;confidence:number;notes:string[]};
export function runTemporal02(frames:PoseFrame[]):Temporal02Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=temporal`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'temporal:temporal02',score,confidence,notes};
}
export function featureTemporal02(frames:PoseFrame[]):FeatureValue{const r=runTemporal02(frames);return{name:'temporal02',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

