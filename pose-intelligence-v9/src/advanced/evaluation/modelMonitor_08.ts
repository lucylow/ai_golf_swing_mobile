import { clamp01, mean } from '../../math';
export type Observation={expected:number;actual:number;confidence:number};
export type ModelMonitor={mae:number;bias:number;quality:number;alert:boolean;alerts:string[]};
export function evaluate(obs:Observation[]):ModelMonitor{const errors=obs.map(o=>o.actual-o.expected);const mae=mean(errors.map(e=>Math.abs(e)));const bias=mean(errors);const quality=clamp01(1/(1+mae));const alerts:string[]=[];if(mae>0.11)alerts.push('mae_threshold');if(Math.abs(bias)>0.04)alerts.push('bias_threshold');const confidence=mean(obs.map(o=>o.confidence));if(confidence<0.55)alerts.push('confidence_floor');return{mae,bias,quality,alert:alerts.length>0,alerts};}
export function summary(m:ModelMonitor):string{return m.alert?`monitor_alert:${m.alerts.join('|')}`:`ok:quality=${m.quality.toFixed(3)}`;}

