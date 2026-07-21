import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("uses the native Next.js build expected by Netlify", async () => {
  const [packageJson, netlifyConfig] = await Promise.all([
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("netlify.toml", root), "utf8"),
  ]);

  assert.match(packageJson, /"build": "next build"/);
  assert.doesNotMatch(packageJson, /vinext|cloudflare|wrangler/i);
  assert.match(netlifyConfig, /publish = "\.next"/);
});

test("keeps the visible form and static Netlify blueprint aligned", async () => {
  const [page, blueprint] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("public/netlify-form.html", root), "utf8"),
  ]);

  const expectedFields = [
    "form-name",
    "name",
    "city",
    "whatsapp",
    "pregnancyWeeks",
    "packageInterest",
    "consent",
    "website",
  ];

  for (const field of expectedFields) {
    const inputPattern = new RegExp(`name=["']${field}["']`);
    assert.match(page, inputPattern);
    assert.match(blueprint, inputPattern);
  }

  assert.match(page, /application\/x-www-form-urlencoded/);
  assert.match(blueprint, /data-netlify="true"/);
  assert.match(blueprint, /data-netlify-honeypot="website"/);
});
