export type Swingrecord={
  schema:'v9',
  title:'Swing-level record',
  swing_id: string | number | null, session_id: string | number | null, club_id: string | number | null, camera_view: string | number | null, duration_ms: string | number | null, quality_score: string | number | null
};
export const SWINGRECORD_FIELDS = 'swing_id,session_id,club_id,camera_view,duration_ms,quality_score'.split(',');
export function validateSwingrecord(row:Partial<Swingrecord>):string[]{const missing:string[]=[];for(const f of SWINGRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

