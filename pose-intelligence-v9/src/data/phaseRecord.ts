export type Phaserecord={
  schema:'v9',
  title:'Phase record',
  swing_id: string | number | null, phase: string | number | null, start_ms: string | number | null, end_ms: string | number | null, confidence: string | number | null
};
export const PHASERECORD_FIELDS = 'swing_id,phase,start_ms,end_ms,confidence'.split(',');
export function validatePhaserecord(row:Partial<Phaserecord>):string[]{const missing:string[]=[];for(const f of PHASERECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

