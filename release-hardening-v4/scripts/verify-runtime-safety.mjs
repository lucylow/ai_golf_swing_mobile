import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const required = [
  'release-hardening-v4/core/AppError.ts',
  'release-hardening-v4/core/globalErrors.ts',
  'release-hardening-v4/ui/ReleaseErrorBoundary.tsx',
  'release-hardening-v4/services/safeFetch.ts',
  'release-hardening-v4/services/mediaValidation.ts',
  'release-hardening-v4/qa/releaseChecks.ts',
];
for (const file of required) if (!fs.existsSync(path.join(root, file))) failures.push(file);
const layout = path.join(root, 'app/_layout.tsx');
if (fs.existsSync(layout)) {
  const source = fs.readFileSync(layout, 'utf8');
  if (!source.includes('installGlobalErrorHandlers')) failures.push('app/_layout.tsx does not install global release error handlers.');
}
if (failures.length) { console.error('RUNTIME SAFETY FAILED'); failures.forEach((f) => console.error(' -', f)); process.exit(1); }
console.log('RUNTIME SAFETY PASS');
