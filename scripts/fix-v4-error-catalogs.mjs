import fs from "node:fs";
import path from "node:path";

const files = ["analysis.ts", "camera.ts", "media.ts", "network.ts"];
const retryWords = ["retry", "reconnect", "refresh"];
let updates = 0;

for (const name of files) {
  const filePath = path.resolve(process.cwd(), "release-hardening-v4", "errorCatalog", name);
  const source = fs.readFileSync(filePath, "utf8");
  const next = source.replace(
    /(recovery:\s*'([^']+)',\s*\n\s*severity:[^\n]+\n\s*)retryable:[^\n]+/g,
    (_match, prefix, recovery) => {
      updates += 1;
      return `${prefix}retryable: ${retryWords.some((word) => recovery.toLowerCase().includes(word))},`;
    },
  );
  fs.writeFileSync(filePath, next);
}

console.log(`Repaired ${updates} release-catalog retryability declarations.`);
