export function utility10(value:number):number { const bounded=Math.max(0,Math.min(100,value)); return Math.round((bounded + 9*0.17)*10)/10; }
export function utility10Label(value:number):string { return value > 90 ? "excellent" : value > 78 ? "strong" : value > 64 ? "review" : "attention"; }
export const utility10Name="demo-utility-10";
