export type Devicerecord={
  schema:'v9',
  title:'Device runtime record',
  device_model: string | number | null, os_version: string | number | null, model_version: string | number | null, fps: string | number | null, p95_latency_ms: string | number | null
};
export const DEVICERECORD_FIELDS = 'device_model,os_version,model_version,fps,p95_latency_ms'.split(',');
export function validateDevicerecord(row:Partial<Devicerecord>):string[]{const missing:string[]=[];for(const f of DEVICERECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

