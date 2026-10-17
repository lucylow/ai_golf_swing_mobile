export type AuditCheck={id:string;label:string;passed:boolean;detail:string};
export type AuditReport={passed:boolean;score:number;checks:AuditCheck[]};
export function auditAnalysisPayload(payload:unknown):AuditReport{
 const checks:AuditCheck[]=[];const p=payload as any;
 checks.push({id:'shape',label:'Analysis object present',passed:!!p,detail:!!p?'present':'missing'});
 checks.push({id:'frames',label:'Frames array',passed:Array.isArray(p?.frames),detail:Array.isArray(p?.frames)?`${p.frames.length} frames`:'missing'});
 checks.push({id:'metrics',label:'Metrics array',passed:Array.isArray(p?.metrics),detail:Array.isArray(p?.metrics)?`${p.metrics.length} metrics`:'missing'});
 checks.push({id:'phases',label:'Phases array',passed:Array.isArray(p?.phases),detail:Array.isArray(p?.phases)?`${p.phases.length} phases`:'missing'});
 checks.push({id:'quality',label:'Quality report',passed:!!p?.quality&&Number.isFinite(p.quality.score),detail:!!p?.quality?'present':'missing'});
 const score=checks.filter(c=>c.passed).length/Math.max(1,checks.length);return {passed:score===1,score,checks};
}
