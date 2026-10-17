import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Quality21Output={id:string;score:number;confidence:number;notes:string[]};
export function runQuality21(frames:PoseFrame[]):Quality21Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=quality`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'quality:quality21',score,confidence,notes};
}
export function featureQuality21(frames:PoseFrame[]):FeatureValue{const r=runQuality21(frames);return{name:'quality21',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

