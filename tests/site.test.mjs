import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageFiles = [
  "index.html",
  "beginner-guide/index.html",
  "mistakes/index.html",
  "faq/index.html",
  "sources/index.html",
];

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("the hero keeps the beginner guide as the primary internal action", async () => {
  const homepage = await read("index.html");
  const ctaBlock = homepage.match(/<div class="cta-row">([\s\S]*?)<\/div>/)?.[1] ?? "";
  assert.match(ctaBlock, /class="btn btn-primary" href="\/beginner-guide\/"/);
  assert.doesNotMatch(ctaBlock, /roblox\.com/i);
});

test("every content page exposes natural navigation to the guide, mistakes, FAQ, and sources", async () => {
  for (const file of pageFiles) {
    const html = await read(file);
    for (const route of ["/beginner-guide/", "/mistakes/", "/faq/", "/sources/"]) {
      assert.ok(html.includes(`href="${route}"`), `${file} is missing ${route}`);
    }
  }
});

test("required guide content is present", async () => {
  const homepage = await read("index.html");
  const guide = await read("beginner-guide/index.html");
  const mistakes = await read("mistakes/index.html");
  const faq = await read("faq/index.html");

  assert.match(homepage, /快速入门/);
  assert.match(homepage, /核心玩法循环/);
  assert.match(guide, /进阶路线/);
  assert.match(mistakes, /常见错误/);
  assert.match(faq, /FAQ/);
});

test("all declared fact IDs are approved", async () => {
  const approval = JSON.parse(await readFile(new URL("../.launch/research/research-approved.json", import.meta.url), "utf8"));
  const approved = new Set(approval.approved_fact_ids);

  for (const file of pageFiles) {
    const html = await read(file);
    for (const match of html.matchAll(/data-fact-ids="([^"]+)"/g)) {
      for (const factId of match[1].split(/\s+/)) {
        assert.ok(approved.has(factId), `${file} uses unapproved ${factId}`);
      }
    }
  }
});

test("the stylesheet includes responsive and keyboard safeguards", async () => {
  const css = await read("styles/main.css");
  assert.match(css, /@media \(min-width: 768px\)/);
  assert.match(css, /@media \(min-width: 1440px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /overflow-wrap: anywhere/);
});

test("every public page exposes a production social image", async () => {
  for (const file of pageFiles) {
    const html = await read(file);
    assert.match(html, /<meta property="og:image" content="https:\/\/build-basetosurviveverity\.wiki\/og-image\.svg">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  }
});
