import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
function walk(dir){const out=[];for(const e of readdirSync(dir,{withFileTypes:true})){const p=`${dir}/${e.name}`;if(e.isDirectory())out.push(...walk(p));else if(p.endsWith('.ts'))out.push(p)}return out}
const files=walk('src');execFileSync('tsc',['-p','tsconfig.json','--noEmit'],{stdio:'inherit'});console.log(`V10 source TypeScript check passed: ${files.length} files`);
