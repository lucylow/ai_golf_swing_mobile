import { spawnSync } from 'node:child_process';
const r=spawnSync('npx',['tsc','-p','tsconfig.src.json','--noEmit'],{cwd:new URL('.',import.meta.url).pathname,shell:true,stdio:'inherit'});
process.exit(r.status??1);

