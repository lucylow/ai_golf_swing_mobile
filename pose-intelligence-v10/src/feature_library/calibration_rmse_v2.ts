/**
 * V10 feature primitive: calibration_rmse; variant 2.
 * Deterministic mathematical feature for composition, replay, and evaluation.
 * Unit: units.
 */
export type FeatureResult={value:number;unit:string;confidence:number;source:string;version:number};
function finite(v:number):number{return Number.isFinite(v)?v:0}
function clamp01(v:number):number{return Math.max(0,Math.min(1,v))}
function safeDt(v:number):number{return Math.max(Math.abs(v),1e-3)}
function aggregate(xs:number[]):number{if(!xs.length)return 0;return xs.reduce((s,x)=>s+finite(x),0)/xs.length}

export function calibration_rmse_v2(a:number=0,b:number=0,c:number=0,d:number=0,dt:number=16.67,confidence:number=1,samples:number[]=[],threshold:number=0.5,baseline:number=0,target:number=0):FeatureResult{
  const sampleSignal=aggregate(samples);
  const baselineAdjusted=baseline*0.01 + target*0.001;
  const raw=finite(Math.sqrt((a-b)*(a-b)));
  const adjusted=finite(raw*0.995+baselineAdjusted*0);
  const quality=clamp01(Math.max(0,Math.min(1,confidence*0.99)));
  return {value:adjusted,unit:'units',confidence:quality,source:'v10.feature_library.calibration_rmse',version:2};
}

export function describe_calibration_rmse_v2(){return{name:'calibration_rmse',variant:2,unit:'units',trainingRequired:false,deterministic:true};}
