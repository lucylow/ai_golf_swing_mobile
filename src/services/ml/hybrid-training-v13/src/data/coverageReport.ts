export class CoverageReport {
  private records=new Map<string,{quality:number;phaseCoverage:number}>();
  ingest(id:string,r:{quality:number;phaseCoverage:number}){this.records.set(id,r);}
  summarizeCoverage(){const vals=[...this.records.values()]; return {count:vals.length,meanQuality:vals.length?vals.reduce((a,b)=>a+b.quality,0)/vals.length:0,meanPhaseCoverage:vals.length?vals.reduce((a,b)=>a+b.phaseCoverage,0)/vals.length:0};}
}
