export type Coachrecord={
  schema:'v9';
  recordType:'Coach insight record';
  swing_id: string | number | null;
  title: string | number | null;
  explanation: string | number | null;
  action: string | number | null;
  confidence: string | number | null;
};
export const COACHRECORD_FIELDS = 'swing_id,title,explanation,action,confidence'.split(',');
export function validateCoachrecord(row:Partial<Coachrecord>):string[]{const missing:string[]=[];for(const f of COACHRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}
