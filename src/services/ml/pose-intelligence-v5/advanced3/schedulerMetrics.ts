import { clamp, mean, median, standardDeviation, safeDivide, quantile } from '../math/scalar';

/**
 * Advanced3 module: inference scheduler counters.
 * This layer is deterministic and intentionally independent of a specific native ML runtime.
 */
export type SchedulermetricsItem={id:string;t:number;value:number;confidence:number};
export type SchedulermetricsReport={score:number;confidence:number;items:SchedulermetricsItem[];notes:string[]};

export class SchedulermetricsEngine {
  private items:SchedulermetricsItem[]=[];
  private report:SchedulermetricsReport={score:0,confidence:0,items:[],notes:[]};

  reset():void{this.items=[];this.report={score:0,confidence:0,items:[],notes:[]};}

  push(item:SchedulermetricsItem):SchedulermetricsReport {
    const clean={...item,value:Number.isFinite(item.value)?item.value:0,confidence:clamp(item.confidence,0,1)};
    this.items.push(clean);
    if(this.items.length>1024)this.items.shift();
    const values=this.items.map(x=>x.value);
    const m=median(values); const spread=standardDeviation(values);
    const confidence=mean(this.items.map(x=>x.confidence));
    const stability=clamp(1-safeDivide(spread,Math.abs(m)+1,0),0,1);
    const notes:string[]=[];
    if(!this.items.length)notes.push('No observations');
    if(confidence<.5)notes.push('Confidence below preferred threshold');
    if(values.length>8 && spread>Math.abs(m)+1)notes.push('High dispersion in recent observations');
    this.report={score:clamp(stability*.6+confidence*.4,0,1),confidence,items:this.items.slice(-32),notes};
    return this.report;
  }

  snapshot():SchedulermetricsReport{return {...this.report,items:this.report.items.map(i=>({...i})),notes:[...this.report.notes]};}
  count():number{return this.items.length;}
  mean():number{return mean(this.items.map(x=>x.value));}
  median():number{return median(this.items.map(x=>x.value));}
  q10():number{return quantile(this.items.map(x=>x.value),.1,0);}
  q90():number{return quantile(this.items.map(x=>x.value),.9,0);}
}

export function schedulerMetricsScore(values:number[],confidence=.8):number{
  if(!values.length)return 0;
  const spread=standardDeviation(values);return clamp(confidence*(1-safeDivide(spread,Math.abs(mean(values))+1,0)),0,1);
}
