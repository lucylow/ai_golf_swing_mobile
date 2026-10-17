/**
 * V10 feature primitive: x_factor_accel; variant 1.
 * Deterministic mathematical feature for composition, replay, and evaluation.
 * Unit: deg/s2.
 */
export type FeatureResult={value:number;unit:string;confidence:number;source:string;version:number};
function finite(v:number):number{return Number.isFinite(v)?v:0}
function clamp01(v:number):number{return Math.max(0,Math.min(1,v))}
function safeDt(v:number):number{return Math.max(Math.abs(v),1e-3)}
function aggregate(xs:number[]):number{if(!xs.length)return 0;return xs.reduce((s,x)=>s+finite(x),0)/xs.length}

export function x_factor_accel_v1(a:number=0,b:number=0,c:number=0,d:number=0,dt:number=16.67,confidence:number=1,samples:number[]=[],threshold:number=0.5,baseline:number=0,target:number=0):FeatureResult{
  const sampleSignal=aggregate(samples);
  const baselineAdjusted=baseline*0.01 + target*0.001;
  const raw=finite((d-c)/safeDt(dt)*1000);
  const adjusted=finite(raw*1+baselineAdjusted*0);
  const quality=clamp01(Math.max(0,Math.min(1,confidence*1.00)));
  return {value:adjusted,unit:'deg/s2',confidence:quality,source:'v10.feature_library.x_factor_accel',version:1};
}

export function describe_x_factor_accel_v1(){return{name:'x_factor_accel',variant:1,unit:'deg/s2',trainingRequired:false,deterministic:true};}
