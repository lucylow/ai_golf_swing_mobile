import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skip = /(^|\/)(node_modules|\.git|dist|build)(\/|$)|\.example\.(ts|js|json)$|\.md$/;
const suspicious = [
  /-----BEGIN (RSA|OPENSSH|EC|PRIVATE) KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /sk_live_[A-Za-z0-9]+/,
  /sk_test_[A-Za-z0-9]+/,
  /AIza[0-9A-Za-z_-]{20,}/,
];
const hits = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).replaceAll('\\', '/');
    if (skip.test(rel)) continue;
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx|json|plist|strings)$/i.test(rel)) {
      const text = fs.readFileSync(full, 'utf8');
      for (const pattern of suspicious) if (pattern.test(text)) hits.push(rel);
    }
  }
}
walk(root);
if (hits.length) { console.error('POSSIBLE SECRETS:', [...new Set(hits)]); process.exit(1); }
console.log('SECRET SCAN PASS');
