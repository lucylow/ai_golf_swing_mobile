export interface SplitSample { sampleId:string; subjectId:string; }
export class LeakageGuard {
  assertNoSubjectLeakage<T extends SplitSample>(samples:T[]):void{
    const owner=new Map<string,number>();
    for(const s of samples){ const split=(s as any).features?.split ?? (s as any).split; if(split==null) continue; const prev=owner.get(s.subjectId); if(prev!==undefined && prev!==split) throw new Error(`subject leakage: ${s.subjectId}`); owner.set(s.subjectId,split); }
  }
}
