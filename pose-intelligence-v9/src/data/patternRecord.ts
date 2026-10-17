export type Patternrecord={
  schema:'v9',
  title:'Pattern hypothesis record',
  swing_id: string | number | null, pattern: string | number | null, score: string | number | null, confidence: string | number | null, evidence: string | number | null
};
export const PATTERNRECORD_FIELDS = 'swing_id,pattern,score,confidence,evidence'.split(',');
export function validatePatternrecord(row:Partial<Patternrecord>):string[]{const missing:string[]=[];for(const f of PATTERNRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

