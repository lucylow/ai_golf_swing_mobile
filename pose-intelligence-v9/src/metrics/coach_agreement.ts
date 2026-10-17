export type Coach_Agreement={name:'coach_agreement';label:'coach agreement';value:number;unit:'ratio';target:number;direction:'up'|'down'};
export function scoreCoach_Agreement(value:number,target:number,direction:'up'|'down'='up'):number{const raw=direction==='up'?value/Math.max(target,1e-6):target/Math.max(value,1e-6);return Math.max(0,Math.min(1,0.5+0.5*Math.tanh(raw-1)));}

