import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "release-hardening-v4");
const directories = ["scenarios", "tests"];
let filesChanged = 0;
let replacements = 0;

for (const directory of directories) {
  const directoryPath = path.join(root, directory);
  for (const name of fs.readdirSync(directoryPath)) {
    if (!name.endsWith(".ts") && !name.endsWith(".tsx")) continue;
    const filePath = path.join(directoryPath, name);
    const source = fs.readFileSync(filePath, "utf8");
    let count = 0;
    let next = source.replace(/\b(get|evaluate)(\d{2})([A-Z][A-Za-z0-9_]*)/g, (_match, prefix, number, identifier) => {
      count += 1;
      return `${prefix}Scenario${number}${identifier}`;
    });
    next = next.replace(/\b(\d{2})([A-Z][A-Za-z0-9_]*)/g, (_match, number, identifier) => {
      count += 1;
      return `Scenario${number}${identifier}`;
    });
    if (next !== source) {
      fs.writeFileSync(filePath, next);
      filesChanged += 1;
      replacements += count;
    }
  }
}

console.log(`Repaired ${replacements} invalid numeric identifiers across ${filesChanged} V4 scenario/test files.`);
