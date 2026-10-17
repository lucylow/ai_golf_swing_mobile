export interface ActiveSample { sampleId:string; quality:number; phaseCoverage:number; domain:string; [key:string]:any }
export class ActiveLearning {
  score(s:ActiveSample):number{return (1-s.quality)*0.6+(1-s.phaseCoverage)*0.4+(s.domain==='real'?0.1:0);}
  rankUncertain<T extends ActiveSample>(samples:T[]):T[]{return [...samples].sort((a,b)=>this.score(b)-this.score(a));}
}
