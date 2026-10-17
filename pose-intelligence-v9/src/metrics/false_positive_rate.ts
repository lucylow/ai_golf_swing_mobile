export type False_Positive_Rate={name:'false_positive_rate';label:'false positive rate';value:number;unit:'ratio';target:number;direction:'up'|'down'};
export function scoreFalse_Positive_Rate(value:number,target:number,direction:'up'|'down'='up'):number{const raw=direction==='up'?value/Math.max(target,1e-6):target/Math.max(value,1e-6);return Math.max(0,Math.min(1,0.5+0.5*Math.tanh(raw-1)));}

