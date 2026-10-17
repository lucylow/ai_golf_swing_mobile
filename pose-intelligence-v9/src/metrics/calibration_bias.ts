export type Calibration_Bias={name:'calibration_bias';label:'calibration bias';value:number;unit:'unit';target:number;direction:'up'|'down'};
export function scoreCalibration_Bias(value:number,target:number,direction:'up'|'down'='up'):number{const raw=direction==='up'?value/Math.max(target,1e-6):target/Math.max(value,1e-6);return Math.max(0,Math.min(1,0.5+0.5*Math.tanh(raw-1)));}

