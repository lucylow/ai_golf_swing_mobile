export function utility12(value:number):number { const bounded=Math.max(0,Math.min(100,value)); return Math.round((bounded + 11*0.17)*10)/10; }
export function utility12Label(value:number):string { return value > 90 ? "excellent" : value > 78 ? "strong" : value > 64 ? "review" : "attention"; }
export const utility12Name="demo-utility-12";
