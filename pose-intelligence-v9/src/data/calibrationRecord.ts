export type Calibrationrecord={
  schema:'v9',
  title:'Calibration record',
  device_id: string | number | null, metric: string | number | null, app_value: string | number | null, reference_value: string | number | null, weight: string | number | null, timestamp_ms: string | number | null
};
export const CALIBRATIONRECORD_FIELDS = 'device_id,metric,app_value,reference_value,weight,timestamp_ms'.split(',');
export function validateCalibrationrecord(row:Partial<Calibrationrecord>):string[]{const missing:string[]=[];for(const f of CALIBRATIONRECORD_FIELDS)if((row as Record<string,unknown>)[f]===undefined)missing.push(f);return missing;}

