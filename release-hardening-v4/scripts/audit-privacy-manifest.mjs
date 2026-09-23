import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const candidates = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'build' || entry.name === 'dist') continue;
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'PrivacyInfo.xcprivacy') candidates.push(full);
  }
}
walk(root);
console.log(`Privacy manifests found: ${candidates.length}`);
if (candidates.length === 0) console.warn('WARN: no PrivacyInfo.xcprivacy found; inspect the final archive and all bundled SDKs before submission.');
for (const file of candidates) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes('NSPrivacyAccessedAPITypes')) console.warn('WARN:', file, 'has no NSPrivacyAccessedAPITypes key.');
  if (text.includes('REPLACE_WITH_') || text.includes('TODO')) console.error('WARN:', file, 'contains placeholders/TODOs.');
}
console.log('PRIVACY MANIFEST AUDIT COMPLETE');
