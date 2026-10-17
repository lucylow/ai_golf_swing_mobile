import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Tracking36Output={id:string;score:number;confidence:number;notes:string[]};
export function runTracking36(frames:PoseFrame[]):Tracking36Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=tracking`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'tracking:tracking36',score,confidence,notes};
}
export function featureTracking36(frames:PoseFrame[]):FeatureValue{const r=runTracking36(frames);return{name:'tracking36',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

