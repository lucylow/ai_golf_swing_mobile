export function utility15(value:number):number { const bounded=Math.max(0,Math.min(100,value)); return Math.round((bounded + 14*0.17)*10)/10; }
export function utility15Label(value:number):string { return value > 90 ? "excellent" : value > 78 ? "strong" : value > 64 ? "review" : "attention"; }
export const utility15Name="demo-utility-15";
