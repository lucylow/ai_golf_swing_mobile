import { clamp, mean, median, standardDeviation, safeDivide, quantile } from '../math/scalar';

/**
 * Pose Intelligence V5 advanced module: change-point detection for motion regime shifts.
 * Deterministic and dependency-light by design.
 */
export type ChangepointPoint={t:number;v:number;c?:number};
export type ChangepointResult={score:number;confidence:number;values:number[];notes:string[]};

export class ChangepointEngine {
  private readonly points:ChangepointPoint[]=[];
  private latest:ChangepointResult={score:0,confidence:0,values:[],notes:[]};

  reset():void{this.points.length=0;this.latest={score:0,confidence:0,values:[],notes:[]};}

  push(point:ChangepointPoint):ChangepointResult {
    const c=clamp(point.c??1,0,1);
    const v=Number.isFinite(point.v)?point.v:0;
    this.points.push({t:point.t,v,c});
    if(this.points.length>512)this.points.shift();
    const values=this.points.map(p=>p.v);
    const center=median(values);
    const spread=standardDeviation(values);
    const recent=values.slice(Math.max(0,values.length-12));
    const recentMean=mean(recent);
    const stability=clamp(1-safeDivide(spread,Math.abs(center)+1,0),0,1);
    const confidence=this.points.reduce((s,p)=>s+(p.c ?? 0),0)/this.points.length;
    this.latest={score:clamp(stability*.65+confidence*.35,0,1),confidence,values:[center,recentMean,spread],notes:[]};
    if(confidence<.45)this.latest.notes.push('Low observation confidence');
    if(spread>Math.abs(center)+1)this.latest.notes.push('High variance');
    return this.latest;
  }

  snapshot():ChangepointResult{return {...this.latest,values:[...this.latest.values],notes:[...this.latest.notes]};}
  count():number{return this.points.length;}
  mean():number{return mean(this.points.map(p=>p.v));}
  median():number{return median(this.points.map(p=>p.v));}
  q90():number{return quantile(this.points.map(p=>p.v),.9,0);}
  confidence():number{return this.points.length?mean(this.points.map(p=>p.c??0)):0;}
}

export function normalizeChangepoint(values:number[]):number[]{
  if(!values.length)return [];
  const m=mean(values);const s=Math.max(.0001,standardDeviation(values));
  return values.map(v=>safeDivide(v-m,s,0));
}

export function scoreChangepointStability(values:number[]):number{
  if(values.length<2)return 0;
  const s=standardDeviation(values); const scale=Math.max(.0001,Math.abs(mean(values))+1);
  return clamp(1-s/scale,0,1);
}
