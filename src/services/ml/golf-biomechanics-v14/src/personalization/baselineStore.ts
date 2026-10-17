import { PersonalBaseline } from '../types';
import { mad, median } from '../math';

export class BaselineStore {
  private history=new Map<string,number[]>();
  record(metric:string,value:number){
    const xs=this.history.get(metric)??[];
    xs.push(value);
    if(xs.length>200) xs.shift();
    this.history.set(metric,xs);
  }
  get(metric:string):PersonalBaseline|null{
    const xs=this.history.get(metric)??[];
    if(xs.length<3) return null;
    const m=median(xs), spread=Math.max(mad(xs),1e-3);
    return {metric,median:m,mad:spread,sampleCount:xs.length,lower:m-2.5*spread,upper:m+2.5*spread};
  }
  all():PersonalBaseline[]{ return [...this.history.keys()].map(k=>this.get(k)).filter((x):x is PersonalBaseline=>!!x); }
  reset(){this.history.clear();}
}
