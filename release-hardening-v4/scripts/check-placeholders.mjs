import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const ignore = /(^|\/)(node_modules|\.git|dist|build|release-hardening-v4|tests)(\/|$)|\.(example|template)\.(ts|js|json|env)$/i;
const needles = ['REPLACE_WITH_', 'YOUR_', 'TODO_RELEASE_', 'example.com'];
const hits = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).replaceAll('\\', '/');
    if (ignore.test(rel)) continue;
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx|json|env|plist|strings)$/i.test(rel)) {
      const text = fs.readFileSync(full, 'utf8');
      const executableText = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
      if (needles.some((needle) => executableText.includes(needle))) hits.push(rel);
    }
  }
}
walk(root);
if (hits.length) { console.error('PLACEHOLDERS FOUND'); hits.forEach((x) => console.error(' -', x)); process.exit(1); }
console.log('PLACEHOLDER SCAN PASS');
