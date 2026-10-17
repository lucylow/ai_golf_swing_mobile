export type Annotationrecord={
  schema:'v9',
  title:'Human annotation record',
  frame_index: string | number | null, phase: string | number | null, label: string | number | null, annotator_id: string | number | null, confidence: string | number | null
};
export const ANNOTATIONRECORD_FIELDS = 'frame_index,phase,label,annotator_id,confidence'.split(',');
export function validateAnnotationrecord(row:Partial<Annotationrecord>):string[]{const missing:string[]=[];for(const f of ANNOTATIONRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

