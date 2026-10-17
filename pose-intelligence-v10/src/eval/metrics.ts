export function rmse(pred:number[],truth:number[]){const n=Math.min(pred.length,truth.length);if(!n)return 0;return Math.sqrt(pred.slice(0,n).reduce((s,x,i)=>s+(x-truth[i])**2,0)/n)}
export function mae(pred:number[],truth:number[]){const n=Math.min(pred.length,truth.length);if(!n)return 0;return pred.slice(0,n).reduce((s,x,i)=>s+Math.abs(x-truth[i]),0)/n}
export function phaseAccuracy(pred:string[],truth:string[]){const n=Math.min(pred.length,truth.length);if(!n)return 0;return pred.slice(0,n).reduce((s,x,i)=>s+(x===truth[i]?1:0),0)/n}
export function f1(pred:string[],truth:string[],label:string){let tp=0,fp=0,fn=0;for(let i=0;i<Math.min(pred.length,truth.length);i++){if(pred[i]===label&&truth[i]===label)tp++;else if(pred[i]===label)fp++;else if(truth[i]===label)fn++;}return 2*tp/(2*tp+fp+fn||1)}
export function calibrationRmse(prob:number[],obs:number[]){return rmse(prob,obs)}
