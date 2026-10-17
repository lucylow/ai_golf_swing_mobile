export type Split='train'|'validation'|'test';
export function deterministicSplit(id:string):Split{let h=0;for(const c of id)h=(h*31+c.charCodeAt(0))>>>0;const p=h%100;return p<70?'train':p<85?'validation':'test';}
export function groupAwareSplit(ids:string[]):Record<Split,string[]>{return ids.reduce((a,id)=>{(a[deterministicSplit(id)]??=[]).push(id);return a;},{train:[],validation:[],test:[]} as Record<Split,string[]>);}


export function detectSubjectLeakage(train:string[], validation:string[], test:string[]):{leaked:string[];pass:boolean}{
  const a=new Set(train), b=new Set(validation), c=new Set(test), leaked:string[]=[];
  for(const id of a) if(b.has(id)||c.has(id)) leaked.push(id);
  for(const id of b) if(c.has(id)) leaked.push(id);
  return {leaked:[...new Set(leaked)],pass:leaked.length===0};
}
