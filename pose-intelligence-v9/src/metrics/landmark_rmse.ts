export type Landmark_Rmse={name:'landmark_rmse';label:'landmark RMSE';value:number;unit:'px';target:number;direction:'up'|'down'};
export function scoreLandmark_Rmse(value:number,target:number,direction:'up'|'down'='up'):number{const raw=direction==='up'?value/Math.max(target,1e-6):target/Math.max(value,1e-6);return Math.max(0,Math.min(1,0.5+0.5*Math.tanh(raw-1)));}

