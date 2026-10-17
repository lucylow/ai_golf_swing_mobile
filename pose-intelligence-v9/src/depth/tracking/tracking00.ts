import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Tracking00Output={id:string;score:number;confidence:number;notes:string[]};
export function runTracking00(frames:PoseFrame[]):Tracking00Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=tracking`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'tracking:tracking00',score,confidence,notes};
}
export function featureTracking00(frames:PoseFrame[]):FeatureValue{const r=runTracking00(frames);return{name:'tracking00',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

