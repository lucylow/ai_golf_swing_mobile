import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Coaching06Output={id:string;score:number;confidence:number;notes:string[]};
export function runCoaching06(frames:PoseFrame[]):Coaching06Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=coaching`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'coaching:coaching06',score,confidence,notes};
}
export function featureCoaching06(frames:PoseFrame[]):FeatureValue{const r=runCoaching06(frames);return{name:'coaching06',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

