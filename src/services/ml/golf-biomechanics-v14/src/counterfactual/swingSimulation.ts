import { clamp, mean, sd } from '../math';

export interface SwingState { path:number; face:number; tempo:number; hipLead:number; armLead:number; }
export interface CounterfactualResult { baseline:SwingState; candidate:SwingState; predictedDispersion:number; gain:number; risk:number; explanation:string; }

export function simulateCounterfactual(base:SwingState, adjustment:Partial<SwingState>):CounterfactualResult{
  const candidate:SwingState={...base,...adjustment};
  const gain=mean([base.path-candidate.path,base.face-candidate.face, candidate.hipLead-base.hipLead])/3;
  const trajectory=[candidate.path,candidate.face,candidate.tempo,candidate.hipLead,candidate.armLead];
  const risk=clamp(sd(trajectory)/10,0,1);
  const predictedDispersion=Math.abs(candidate.path)+Math.abs(candidate.face)*0.8+risk*2;
  const explanation=`Predicted change combines path, face, tempo and sequencing deltas; it is a model scenario, not a guarantee.`;
  return {baseline:base,candidate,predictedDispersion,gain,risk,explanation};
}
