export interface BenchmarkCase { id:string; expected:number; actual:number; tolerance:number; }
export interface BenchmarkSummary { passRate:number; meanAbsError:number; maxAbsError:number; failures:string[]; }
export function benchmark(cases:BenchmarkCase[]):BenchmarkSummary{
  const failures:string[]=[]; let err=0,max=0;
  for(const c of cases){ const e=Math.abs(c.actual-c.expected);err+=e;max=Math.max(max,e);if(e>c.tolerance)failures.push(c.id); }
  return {passRate:cases.length?1-failures.length/cases.length:0,meanAbsError:cases.length?err/cases.length:0,maxAbsError:max,failures};
}
