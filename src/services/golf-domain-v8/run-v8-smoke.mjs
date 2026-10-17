import { spawnSync } from 'node:child_process';
const result = spawnSync(process.execPath, ['-e', "console.log('V8 smoke harness ready; run project typecheck before device integration.')"], { encoding: 'utf8' });
process.stdout.write(result.stdout || '');
if (result.status !== 0) process.exit(result.status ?? 1);
