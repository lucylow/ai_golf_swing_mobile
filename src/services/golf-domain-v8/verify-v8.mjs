import fs from 'node:fs';
import path from 'node:path';
const root = new URL('./src/', import.meta.url).pathname;
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const ts = walk(root).filter((p) => p.endsWith('.ts'));
console.log(`V8 source files: ${ts.length}`);
for (const file of ts) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.trim()) throw new Error(`Empty source: ${file}`);
}
console.log('Basic source verification passed.');
