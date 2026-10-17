export function utility08(value:number):number { const bounded=Math.max(0,Math.min(100,value)); return Math.round((bounded + 7*0.17)*10)/10; }
export function utility08Label(value:number):string { return value > 90 ? "excellent" : value > 78 ? "strong" : value > 64 ? "review" : "attention"; }
export const utility08Name="demo-utility-08";
