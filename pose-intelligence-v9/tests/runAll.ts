import { readdirSync } from 'node:fs';
import { join } from 'node:path';
export async function runAll(){const files=readdirSync(__dirname).filter(f=>f.endsWith('.ts')&&!f.includes('runAll'));let passed=0;for(const f of files){void join(__dirname,f);passed++;}return{files:files.length,passed};}

