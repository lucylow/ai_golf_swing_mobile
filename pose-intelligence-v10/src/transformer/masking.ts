export function causalMask(n:number){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>j<=i));}
export function localWindowMask(n:number,radius:number){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Math.abs(i-j)<=radius));}
export function phaseAwareMask(phases:string[],samePhaseOnly=false){return phases.map(a=>phases.map(b=>samePhaseOnly?a===b:true));}
