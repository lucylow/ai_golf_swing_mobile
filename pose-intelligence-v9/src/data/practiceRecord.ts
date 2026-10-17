export type Practicerecord={
  schema:'v9',
  title:'Practice record',
  session_id: string | number | null, drill_id: string | number | null, reps: string | number | null, success_rate: string | number | null, fatigue: string | number | null, mastery: string | number | null
};
export const PRACTICERECORD_FIELDS = 'session_id,drill_id,reps,success_rate,fatigue,mastery'.split(',');
export function validatePracticerecord(row:Partial<Practicerecord>):string[]{const missing:string[]=[];for(const f of PRACTICERECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

