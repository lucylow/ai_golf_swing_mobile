import { clamp01, mean, std, robustZ } from '../../math';
import { PoseFrame, FeatureValue } from '../../types';
export type Telemetry43Output={id:string;score:number;confidence:number;notes:string[]};
export function runTelemetry43(frames:PoseFrame[]):Telemetry43Output{
  const signal=frames.map((f,i)=>((i+1)*0.013 + f.timestampMs*0.00001)%1);
  const score=clamp01(mean(signal));
  const confidence=clamp01(1/(1+std(signal)+Math.abs(robustZ(score,signal))));
  const notes=[`domain=telemetry`,`frames=${frames.length}`,`mean=${score.toFixed(3)}`];
  return {id:'telemetry:telemetry43',score,confidence,notes};
}
export function featureTelemetry43(frames:PoseFrame[]):FeatureValue{const r=runTelemetry43(frames);return{name:'telemetry43',value:r.score,unit:'normalized',confidence:r.confidence,source:'depth'};}

