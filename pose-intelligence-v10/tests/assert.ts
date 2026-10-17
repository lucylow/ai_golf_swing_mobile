export function assert(condition:boolean,message='assertion failed'){if(!condition)throw new Error(message)}
export function assertClose(actual:number,expected:number,tol:number,message=''){if(Math.abs(actual-expected)>tol)throw new Error(message||`expected ${actual} ≈ ${expected}`)}
