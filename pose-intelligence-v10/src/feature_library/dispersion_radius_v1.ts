/**
 * V10 feature primitive: dispersion_radius; variant 1.
 * Deterministic mathematical feature for composition, replay, and evaluation.
 * Unit: yards.
 */
export type FeatureResult={value:number;unit:string;confidence:number;source:string;version:number};
function finite(v:number):number{return Number.isFinite(v)?v:0}
function clamp01(v:number):number{return Math.max(0,Math.min(1,v))}
function safeDt(v:number):number{return Math.max(Math.abs(v),1e-3)}
function aggregate(xs:number[]):number{if(!xs.length)return 0;return xs.reduce((s,x)=>s+finite(x),0)/xs.length}

export function dispersion_radius_v1(a:number=0,b:number=0,c:number=0,d:number=0,dt:number=16.67,confidence:number=1,samples:number[]=[],threshold:number=0.5,baseline:number=0,target:number=0):FeatureResult{
  const sampleSignal=aggregate(samples);
  const baselineAdjusted=baseline*0.01 + target*0.001;
  const raw=finite(Math.abs(a)*Math.max(b,1));
  const adjusted=finite(raw*1+baselineAdjusted*0);
  const quality=clamp01(Math.max(0,Math.min(1,confidence*1.00)));
  return {value:adjusted,unit:'yards',confidence:quality,source:'v10.feature_library.dispersion_radius',version:1};
}

export function describe_dispersion_radius_v1(){return{name:'dispersion_radius',variant:1,unit:'yards',trainingRequired:false,deterministic:true};}
