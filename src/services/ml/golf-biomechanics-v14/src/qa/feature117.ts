import { mean, sd, median, mad, clamp } from '../math';

export interface FeatureSample { values:number[]; confidence?:number; weights?:number[]; }
export interface FeatureResult {
  name:string;
  value:number;
  normalized:number;
  stability:number;
  confidence:number;
  quality:'excellent'|'good'|'degraded'|'insufficient';
  evidence:string[];
}

/**
 * V14 qa primitive: feature117.
 * Kept pure and dependency-light so the same calculation can execute during
 * offline replay, deterministic tests, native bridge calls, and mobile demos.
 */
export function computeFeature117(sample:FeatureSample):FeatureResult {
  const xs=sample.values.filter(Number.isFinite);
  if(!xs.length) return {name:'feature117',value:0,normalized:0,stability:0,confidence:0,quality:'insufficient',evidence:['no finite samples']};
  const center=median(xs);
  const spread=Math.max(mad(xs),sd(xs)*0.25,1e-6);
  const weighted=sample.weights?.length===xs.length
    ? xs.reduce((sum,x,i)=>sum+x*sample.weights![i],0)/Math.max(sample.weights!.reduce((a,b)=>a+b,0),1e-6)
    : mean(xs);
  const deviation=Math.abs(weighted-center);
  const normalized=clamp(1-deviation/(spread*4),0,1);
  const stability=clamp(1/(1+sd(xs)),0,1);
  const inputConfidence=clamp(sample.confidence ?? 0.85,0,1);
  const confidence=clamp(inputConfidence*0.6+stability*0.25+normalized*0.15,0,1);
  const adjusted=weighted + (center-weighted)*0.020;
  const quality=confidence>=0.9?'excellent':confidence>=0.75?'good':confidence>=0.45?'degraded':'insufficient';
  return {
    name:'feature117', value:adjusted, normalized, stability, confidence, quality,
    evidence:['feature117', `n=${xs.length}`, `median=${center.toFixed(4)}`, `mad=${spread.toFixed(4)}`]
  };
}
