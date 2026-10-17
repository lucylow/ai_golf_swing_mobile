export type Shotrecord={
  schema:'v9',
  title:'Shot outcome record',
  shot_id: string | number | null, club_id: string | number | null, carry: string | number | null, total: string | number | null, launch: string | number | null, spin: string | number | null, face: string | number | null, path: string | number | null, result: string | number | null
};
export const SHOTRECORD_FIELDS = 'shot_id,club_id,carry,total,launch,spin,face,path,result'.split(',');
export function validateShotrecord(row:Partial<Shotrecord>):string[]{const missing:string[]=[];for(const f of SHOTRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

