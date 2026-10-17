import { cosineSimilarity } from '../embedding';
export type Prototype={id:string;label:string;embedding:number[];metadata:Record<string,string|number>};
export function nearestPrototype(query:number[],items:Prototype[],k=3){return items.map(p=>({...p,similarity:cosineSimilarity(query,p.embedding)})).sort((a,b)=>b.similarity-a.similarity).slice(0,k);}

