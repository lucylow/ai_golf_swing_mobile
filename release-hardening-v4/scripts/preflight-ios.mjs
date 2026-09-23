import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const warnings = [];
const requiredFiles = ['package.json', 'app.json', 'app.config.js', 'app.config.ts', 'eas.json'];
const hasConfig = requiredFiles.some((name) => fs.existsSync(path.join(root, name)));
if (!hasConfig) failures.push('No Expo app config found (app.json/app.config.js/app.config.ts).');
if (!fs.existsSync(path.join(root, 'app', '_layout.tsx'))) failures.push('Expo Router root layout missing.');
if (!fs.existsSync(path.join(root, 'release-hardening-v4'))) failures.push('release-hardening-v4 folder missing.');
if (fs.existsSync(path.join(root, 'eas.json'))) {
  try {
    const eas = JSON.parse(fs.readFileSync(path.join(root, 'eas.json'), 'utf8'));
    if (!eas.build?.production) warnings.push('eas.json has no production build profile.');
  } catch { failures.push('eas.json is not valid JSON.'); }
} else warnings.push('No eas.json found; copy/merge config/eas.release.json before release.');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!pkg.dependencies?.expo) failures.push('Expo dependency is missing.');
if (!pkg.dependencies?.['expo-router']) warnings.push('expo-router dependency was not found.');
if (failures.length) { console.error('RELEASE PREFLIGHT FAILED'); failures.forEach((f) => console.error(' -', f)); process.exit(1); }
console.log('RELEASE PREFLIGHT PASS');
warnings.forEach((w) => console.warn('WARN:', w));
