// Seed happy-kinetik with the prototype catalog via teifi-shopify-connect.
// Usage: node web/scripts/seed-shopify.mjs [handle]   (omit handle to seed all 18)
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const items = JSON.parse(readFileSync("web/scripts/shopify-seed.json", "utf8"));
const only = process.argv[2];

function tc(args) {
  try {
    return execFileSync("teifi-shopify-connect", args, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
  } catch (e) {
    return `ERROR: ${e.stderr || e.message}`;
  }
}

for (const p of items) {
  if (only && p.handle !== only) continue;
  const input = {
    title: p.title,
    handle: p.handle,
    descriptionHtml: p.descriptionHtml,
    productType: p.productType,
    vendor: p.vendor,
    tags: p.tags,
    status: p.status,
  };
  const res = tc(["product", "create", "--json", JSON.stringify(input)]);
  console.log(`=== ${p.handle} ===`);
  console.log(res.slice(0, 600));
}
