import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Tracking27Output={id:string;score:number;confidence:number;notes:string[]};
export function runTracking27(frames:PoseFrame[]):Tracking27Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=tracking`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'tracking:tracking27',score,confidence,notes};
}
export function featureTracking27(frames:PoseFrame[]):FeatureValue{const r=runTracking27(frames);return{name:'tracking27',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

