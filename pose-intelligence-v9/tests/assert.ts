export function assert(condition:boolean,message:string):void{if(!condition)throw new Error(message);}
export function assertNear(actual:number,expected:number,tolerance:number,message:string):void{if(Math.abs(actual-expected)>tolerance)throw new Error(`${message}: ${actual} not within ${tolerance} of ${expected}`);}

