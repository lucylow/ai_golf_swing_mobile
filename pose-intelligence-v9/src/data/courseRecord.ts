export type Courserecord={
  schema:'v9',
  title:'Course context record',
  course_id: string | number | null, hole: string | number | null, par: string | number | null, yards: string | number | null, wind_speed: string | number | null, wind_direction: string | number | null, lie: string | number | null
};
export const COURSERECORD_FIELDS = 'course_id,hole,par,yards,wind_speed,wind_direction,lie'.split(',');
export function validateCourserecord(row:Partial<Courserecord>):string[]{const missing:string[]=[];for(const f of COURSERECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

