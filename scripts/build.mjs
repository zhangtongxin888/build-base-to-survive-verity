import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist");
const siteEntries = [
  "index.html",
  "404.html",
  "beginner-guide",
  "mistakes",
  "faq",
  "sources",
  "styles",
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of siteEntries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}

const publicDir = path.join(root, "public");
for (const entry of await readdir(publicDir)) {
  await cp(path.join(publicDir, entry), path.join(output, entry), { recursive: true });
}

console.log(`Built static site in ${output}`);
