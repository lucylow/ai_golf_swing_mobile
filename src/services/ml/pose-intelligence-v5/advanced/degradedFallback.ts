import { clamp01 } from '../types/landmarks';
import { mean, median, standardDeviation, safeDivide, clamp, quantile } from '../math/scalar';

/**
 * Pose Intelligence V5 — fallback capability routing.
 * This module is deliberately self-contained and deterministic. It is intended to
 * sit between native/on-device inference and the React Native product layer.
 */
export type DegradedfallbackInput = { t:number; values:number[]; confidence?:number };
export type DegradedfallbackSnapshot = { score:number; confidence:number; values:number[]; notes:string[] };

export class DegradedfallbackEngine {
  private samples:DegradedfallbackInput[]=[];
  private last:DegradedfallbackSnapshot={score:0,confidence:0,values:[],notes:[]};

  reset():void{this.samples=[];this.last={score:0,confidence:0,values:[],notes:[]};}

  push(sample:DegradedfallbackInput):DegradedfallbackSnapshot {
    const clean = sample.values.map(v=>Number.isFinite(v)?v:0);
    const confidence = clamp01(sample.confidence ?? 1);
    this.samples.push({t:sample.t,values:clean,confidence});
    if(this.samples.length>240)this.samples.shift();
    const all=this.flatten();
    const spread=standardDeviation(all);
    const central=median(all);
    const latest=clean.length?mean(clean):0;
    const stability=clamp(1-safeDivide(spread,Math.abs(central)+1,0),0,1);
    const score=clamp((stability*.7)+(confidence*.3),0,1);
    const notes:string[]=[];
    if(!clean.length)notes.push('No numeric signal available');
    if(confidence<.45)notes.push('Low input confidence');
    if(spread>Math.abs(central)+1)notes.push('High signal variability');
    this.last={score,confidence,values:[central,latest,spread],notes};
    return this.last;
  }

  snapshot():DegradedfallbackSnapshot{return {...this.last,values:[...this.last.values],notes:[...this.last.notes]};}
  count():number{return this.samples.length;}
  meanVector():number[]{
    if(!this.samples.length)return [];
    const width=Math.max(...this.samples.map(s=>s.values.length));
    const out:number[]=[];
    for(let i=0;i<width;i+=1)out.push(mean(this.samples.map(s=>s.values[i]??0)));
    return out;
  }
  confidence():number{return this.samples.length?mean(this.samples.map(s=>s.confidence??0)):0;}
  quantile(q:number):number{return quantile(this.flatten(),q,0);}

  private flatten():number[]{return this.samples.flatMap(s=>s.values).filter(Number.isFinite);}
}

export function normalizeDegradedfallbackInputs(samples:DegradedfallbackInput[]):DegradedfallbackInput[]{
  if(!samples.length)return [];
  const width=Math.max(...samples.map(s=>s.values.length));
  const columns=Array.from({length:width},(_,i)=>samples.map(s=>s.values[i]??0));
  const means=columns.map(c=>mean(c)); const scales=columns.map(c=>Math.max(.0001,standardDeviation(c)));
  return samples.map(s=>({...s,values:Array.from({length:width},(_,i)=>safeDivide((s.values[i]??0)-means[i],scales[i],0))}));
}

export function degradedFallbackWindowSize():number{return 10;}
export function degradedFallbackVersion():string{return "pose-v5-058";}
export function degradedFallbackDescription():string{return "fallback capability routing";}
