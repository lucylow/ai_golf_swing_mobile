import {HMRInput,HMROutput} from '../mesh/hmrContract';
export type IterationState={pose:number[];shape:number[];camera:{scale:number;tx:number;ty:number};confidence:number};
export interface PoseRegressor{infer(input:HMRInput,state?:IterationState):Promise<IterationState>|IterationState;refine(state:IterationState):IterationState;}
export function iterate(reg:PoseRegressor,input:HMRInput,iterations=3){let s:IterationState|undefined;for(let i=0;i<iterations;i++){s=reg.infer(input,s) as IterationState;s=reg.refine(s)}return s!}
