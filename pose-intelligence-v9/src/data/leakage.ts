export function detectSubjectLeakage(train:string[],validation:string[],test:string[]):{leaked:string[];pass:boolean}{const a=new Set(train),b=new Set(validation),c=new Set(test),leaked:string[]=[];for(const id of a)if(b.has(id)||c.has(id))leaked.push(id);for(const id of b)if(c.has(id))leaked.push(id);return{leaked:[...new Set(leaked)],pass:leaked.length===0};}

