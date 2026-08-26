import { readFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://build-basetosurviveverity.wiki";
const root = path.resolve(process.argv[2] ?? ".");
const pages = new Map([
  ["/", "index.html"],
  ["/beginner-guide/", "beginner-guide/index.html"],
  ["/mistakes/", "mistakes/index.html"],
  ["/faq/", "faq/index.html"],
  ["/sources/", "sources/index.html"],
]);

const errors = [];
const approvedPath = path.join(process.cwd(), ".launch/research/research-approved.json");
const approved = new Set(JSON.parse(await readFile(approvedPath, "utf8")).approved_fact_ids);
const htmlByRoute = new Map();

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

for (const [route, file] of pages) {
  const html = await readFile(path.join(root, file), "utf8");
  htmlByRoute.set(route, html);
  const canonical = `${SITE_URL}${route}`;

  assert(/<html\s+lang="zh-CN">/.test(html), `${file}: missing zh-CN language`);
  assert(/<title>[^<]{12,}[^<]*<\/title>/.test(html), `${file}: title is missing or too short`);
  assert(/<meta\s+name="description"\s+content="[^"]{40,}"\s*\/?\s*>/.test(html), `${file}: description is missing or too short`);
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), `${file}: canonical must be ${canonical}`);
  assert(html.includes(`<meta property="og:url" content="${canonical}">`), `${file}: og:url mismatch`);
  assert(html.includes('<meta property="og:type" content="website">'), `${file}: missing Open Graph type`);
  assert(html.includes('<meta property="og:image" content="https://build-basetosurviveverity.wiki/og-image.svg">'), `${file}: missing absolute Open Graph image`);
  assert(html.includes('<meta name="twitter:card" content="summary_large_image">'), `${file}: missing Twitter large image card`);
  assert(html.includes('<meta name="twitter:image" content="https://build-basetosurviveverity.wiki/og-image.svg">'), `${file}: missing absolute Twitter image`);
  assert(html.includes('type="application/ld+json"'), `${file}: missing JSON-LD`);
  assert(html.includes('href="/styles/main.css"'), `${file}: stylesheet must use a root-relative URL`);
  assert(!/<img\b/i.test(html), `${file}: unlicensed image element found`);
  assert(!/(?:href|src)="http:\/\//i.test(html), `${file}: insecure external URL found`);
  assert(!/href="\/[^"]+\.html(?:[?#"])/i.test(html), `${file}: legacy internal .html link found`);

  for (const match of html.matchAll(/data-fact-ids="([^"]+)"/g)) {
    for (const factId of match[1].trim().split(/\s+/)) {
      assert(approved.has(factId), `${file}: unapproved fact reference ${factId}`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href="(https:\/\/[^"]+)"[^>]*>/g)) {
    const tag = match[0];
    assert(/target="_blank"/.test(tag), `${file}: external link must open separately: ${match[1]}`);
    assert(/rel="[^"]*noopener[^"]*"/.test(tag), `${file}: external link missing noopener: ${match[1]}`);
  }
}

const homepage = htmlByRoute.get("/");
const heroMatch = homepage.match(/<div class="cta-row">([\s\S]*?)<\/div>/);
assert(heroMatch && /class="btn btn-primary" href="\/beginner-guide\/"/.test(heroMatch[1]), "homepage: primary hero CTA must point to /beginner-guide/");

for (const [route, html] of htmlByRoute) {
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const target = match[1].split("#")[0].split("?")[0] || route;
    if (target.startsWith("/styles/")) continue;
    assert(pages.has(target) || target === "/robots.txt" || target === "/sitemap.xml", `${route}: unresolved internal link ${match[1]}`);
  }
}

const forbiddenWording = [
  "声望式",
  "永久枪械解锁",
  "对防守没有帮助",
  "God Pack 与 Falsity Pack 的游戏通行证已停售",
  "CURIOSITY event",
];
for (const [route, html] of htmlByRoute) {
  for (const wording of forbiddenWording) {
    assert(!html.includes(wording), `${route}: rejected or unsupported wording found: ${wording}`);
  }
}

const sitemapPath = root.endsWith(`${path.sep}dist`)
  ? path.join(root, "sitemap.xml")
  : path.join(root, "public/sitemap.xml");
const robotsPath = root.endsWith(`${path.sep}dist`)
  ? path.join(root, "robots.txt")
  : path.join(root, "public/robots.txt");
const sitemap = await readFile(sitemapPath, "utf8");
const robots = await readFile(robotsPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
const expectedUrls = [...pages.keys()].map((route) => `${SITE_URL}${route}`).sort();
assert(JSON.stringify(sitemapUrls) === JSON.stringify(expectedUrls), "sitemap routes do not match public HTML routes");
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt must declare the production sitemap");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${pages.size} canonical pages with ${approved.size} approved fact IDs available.`);
