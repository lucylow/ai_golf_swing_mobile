import { clamp01 } from './math';
export function combineConfidence(detection:number, visibility:number, tracking:number):number {
  const d=clamp01(detection),v=clamp01(visibility),t=clamp01(tracking);
  return clamp01(0.40*d+0.20*v+0.40*t);
}
export function temporalConfidence(samples:number[]):number {
  if(!samples.length)return 0;
  const mean=samples.reduce((a,b)=>a+b,0)/samples.length;
  const variance=samples.reduce((a,b)=>a+(b-mean)**2,0)/samples.length;
  return clamp01(mean*Math.exp(-Math.sqrt(variance)));
}
export function propagate(...parts:number[]):number {
  if(!parts.length)return 0;
  let product=1; for(const p of parts)product*=clamp01(p);
  const geometric=Math.pow(product,1/parts.length);
  const arithmetic=parts.reduce((a,b)=>a+clamp01(b),0)/parts.length;
  return clamp01(0.65*geometric+0.35*arithmetic);
}

