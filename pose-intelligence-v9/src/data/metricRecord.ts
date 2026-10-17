export type Metricrecord={
  schema:'v9',
  title:'Metric record',
  swing_id: string | number | null, metric: string | number | null, value: string | number | null, unit: string | number | null, confidence: string | number | null, source: string | number | null
};
export const METRICRECORD_FIELDS = 'swing_id,metric,value,unit,confidence,source'.split(',');
export function validateMetricrecord(row:Partial<Metricrecord>):string[]{const missing:string[]=[];for(const f of METRICRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

