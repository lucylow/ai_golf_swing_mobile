export type Framerecord={
  schema:'v9',
  title:'Frame-level pose record',
  frame_index: string | number | null, timestamp_ms: string | number | null, landmark_id: string | number | null, x: string | number | null, y: string | number | null, z: string | number | null, confidence: string | number | null, visibility: string | number | null
};
export const FRAMERECORD_FIELDS = 'frame_index,timestamp_ms,landmark_id,x,y,z,confidence,visibility'.split(',');
export function validateFramerecord(row:Partial<Framerecord>):string[]{const missing:string[]=[];for(const f of FRAMERECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

