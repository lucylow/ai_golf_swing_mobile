import { existsSync } from 'node:fs';
const required=['README.md','src/index.ts','src/synthetic/generator.ts','src/synthetic/datasetBuilder.ts','training/stgcn.py','training/transformer.py','training/model.py'];
for(const p of required) if(!existsSync(p)) throw new Error(`Missing ${p}`);
console.log('V12_VERIFY_PASS');
