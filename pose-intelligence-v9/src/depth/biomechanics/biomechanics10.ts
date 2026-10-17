import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Biomechanics10Output={id:string;score:number;confidence:number;notes:string[]};
export function runBiomechanics10(frames:PoseFrame[]):Biomechanics10Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=biomechanics`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'biomechanics:biomechanics10',score,confidence,notes};
}
export function featureBiomechanics10(frames:PoseFrame[]):FeatureValue{const r=runBiomechanics10(frames);return{name:'biomechanics10',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

