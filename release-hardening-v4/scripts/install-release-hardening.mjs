import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const bundle = path.resolve(root, 'release-hardening-v4');
const layout = path.resolve(root, 'app/_layout.tsx');
const backup = `${layout}.before-release-hardening`;

if (!fs.existsSync(bundle)) throw new Error(`Missing ${bundle}`);
if (!fs.existsSync(layout)) throw new Error(`Missing ${layout}. Run this from the Expo app root.`);

const original = fs.readFileSync(layout, 'utf8');
if (!fs.existsSync(backup)) fs.writeFileSync(backup, original);

let next = original;
if (!next.includes("release-hardening-v4/core/globalErrors")) {
  next = `import { installGlobalErrorHandlers } from '../release-hardening-v4/core/globalErrors';\n` + next;
}
const hook = 'initManusRuntime();';
if (next.includes(hook) && !next.includes('installGlobalErrorHandlers();')) {
  next = next.replace(hook, `${hook}\n    const uninstallGlobalErrors = installGlobalErrorHandlers();\n    return uninstallGlobalErrors;`);
}
fs.writeFileSync(layout, next);

const pkgPath = path.resolve(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts = {
  'release:preflight': 'node release-hardening-v4/scripts/preflight-ios.mjs',
  'release:secrets': 'node release-hardening-v4/scripts/check-secrets.mjs',
  'release:placeholders': 'node release-hardening-v4/scripts/check-placeholders.mjs',
  'release:runtime': 'node release-hardening-v4/scripts/verify-runtime-safety.mjs',
  'release:privacy': 'node release-hardening-v4/scripts/audit-privacy-manifest.mjs',
  'release:expo-doctor': 'pnpm exec expo-doctor',
  'release:bundle': 'rm -rf dist && pnpm exec expo export --platform web',
  'release:verify': 'pnpm check && pnpm lint && pnpm test && pnpm release:secrets && pnpm release:placeholders && pnpm release:runtime && pnpm release:privacy && pnpm release:preflight && pnpm release:expo-doctor && pnpm release:bundle',
  ...(pkg.scripts ?? {}),
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log('Release hardening installed. Backup:', backup);
