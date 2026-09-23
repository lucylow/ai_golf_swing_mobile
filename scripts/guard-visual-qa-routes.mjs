import fs from "node:fs";
import path from "node:path";

const appDirectory = path.resolve(process.cwd(), "app");
const mockRoutePattern = /^mock-(?:[a-z-]+)-v3\.tsx$/;
let transformed = 0;

for (const fileName of fs.readdirSync(appDirectory)) {
  if (!mockRoutePattern.test(fileName)) continue;
  const filePath = path.join(appDirectory, fileName);
  const source = fs.readFileSync(filePath, "utf8").trim();
  const match = source.match(/^export \{ default \} from ['"](.+)['"];?$/);
  if (!match) throw new Error(`Unexpected mock route wrapper: ${fileName}`);

  const routeName = fileName
    .replace(/\.tsx$/, "")
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
  const next = [
    'import { DevelopmentRouteGuard } from "@/components/development-route-guard";',
    `import Screen from "${match[1]}";`,
    "",
    `export default function ${routeName}Route() {`,
    "  return <DevelopmentRouteGuard><Screen /></DevelopmentRouteGuard>;",
    "}",
    "",
  ].join("\n");

  fs.writeFileSync(filePath, next);
  transformed += 1;
}

console.log(`Guarded ${transformed} V3 visual QA route wrappers.`);
