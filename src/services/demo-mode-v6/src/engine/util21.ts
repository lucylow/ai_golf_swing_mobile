export function utility21(value:number):number { const bounded=Math.max(0,Math.min(100,value)); return Math.round((bounded + 20*0.17)*10)/10; }
export function utility21Label(value:number):string { return value > 90 ? "excellent" : value > 78 ? "strong" : value > 64 ? "review" : "attention"; }
export const utility21Name="demo-utility-21";
