// Seed a store with the full prototype catalog via teifi-shopify-connect.
// Run: bun run web/scripts/seed-shopify.ts [--domain <shop.myshopify.com>]
// Defaults to happy-kinetik if --domain is omitted.
import { execFileSync } from "node:child_process";
import { products } from "../lib/shopify/fixtures";

const args = process.argv.slice(2);
const domainIdx = args.indexOf("--domain");
const domain = domainIdx >= 0 ? args[domainIdx + 1] : undefined;
const money = (cents: number) => (cents / 100).toFixed(2);

function gql(query: string, vars: Record<string, unknown>): any {
  const cliArgs = ["graphql", ...(domain ? ["--domain", domain] : []), "--query", query, "--vars", JSON.stringify(vars)];
  const out = execFileSync("teifi-shopify-connect", cliArgs, {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
  return JSON.parse(out);
}

const pubRes = gql(`{ publications(first: 5) { nodes { id name } } }`, {});
const ONLINE_STORE = pubRes?.publications?.nodes?.find((n: any) => n.name === "Online Store")?.id;
if (!ONLINE_STORE) { console.error("Could not find Online Store publication"); process.exit(1); }

const PRODUCT_SET = `mutation Seed($input: ProductSetInput!) {
  productSet(synchronous: true, input: $input) {
    product { id handle }
    userErrors { field message }
  }
}`;
const PUBLISH = `mutation Pub($id: ID!, $pid: ID!) {
  publishablePublish(id: $id, input: [{ publicationId: $pid }]) {
    userErrors { field message }
  }
}`;

let ok = 0;
for (const p of products) {
  const colors = p.colors.length ? p.colors : [{ name: "Default", swatch: "#000" }];
  const input: Record<string, unknown> = {
    title: p.title,
    handle: p.handle,
    descriptionHtml: p.description,
    productType: p.type,
    vendor: p.vendor,
    tags: p.tags,
    status: "ACTIVE",
    productOptions: [{ name: "Color", position: 1, values: colors.map((c) => ({ name: c.name })) }],
    variants: colors.map((c, j) => ({
      optionValues: [{ optionName: "Color", name: c.name }],
      price: money(p.price),
      compareAtPrice: p.compare_at_price ? money(p.compare_at_price) : null,
      sku: `${p.code}${colors.length > 1 ? "-" + c.name.toUpperCase().slice(0, 3) : ""}`,
    })),
  };

  try {
    const res = gql(PRODUCT_SET, { input });
    const errs = res?.productSet?.userErrors ?? [];
    const id = res?.productSet?.product?.id;
    if (errs.length || !id) {
      console.log(`✗ ${p.handle}: ${JSON.stringify(errs)}`);
      continue;
    }
    const pub = gql(PUBLISH, { id, pid: ONLINE_STORE });
    const pubErr = pub?.publishablePublish?.userErrors ?? [];
    console.log(`✓ ${p.handle} → ${id.split("/").pop()}  ${money(p.price)}  ${colors.length} variant(s)${pubErr.length ? "  PUBLISH_ERR:" + JSON.stringify(pubErr) : "  published"}`);
    ok++;
  } catch (e: any) {
    console.log(`✗ ${p.handle}: ${(e.stderr || e.message || "").toString().slice(0, 160)}`);
  }
}
console.log(`\nSeeded ${ok}/${products.length} products.`);
