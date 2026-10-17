import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Evaluation08Output={id:string;score:number;confidence:number;notes:string[]};
export function runEvaluation08(frames:PoseFrame[]):Evaluation08Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=evaluation`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'evaluation:evaluation08',score,confidence,notes};
}
export function featureEvaluation08(frames:PoseFrame[]):FeatureValue{const r=runEvaluation08(frames);return{name:'evaluation08',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

