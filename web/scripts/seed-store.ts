// Seed a fresh Waypoint demo store (products + collections) from a catalog JSON file.
// Run: bun run web/scripts/seed-store.ts --domain waypoint-carbon-demo.myshopify.com --catalog web/scripts/catalog-carbon.json
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const domain = flag("domain");
const catalogPath = flag("catalog");
if (!domain || !catalogPath) {
  console.error("Usage: bun run web/scripts/seed-store.ts --domain <shop.myshopify.com> --catalog <path.json>");
  process.exit(1);
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const swatches: Record<string, string> = catalog.colors;
const money = (cents: number) => (cents / 100).toFixed(2);

function gql(query: string, vars: Record<string, unknown>): any {
  const out = execFileSync(
    "teifi-shopify-connect",
    ["graphql", "--domain", domain, "--query", query, "--vars", JSON.stringify(vars)],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  return JSON.parse(out);
}

const pubRes = gql(`{ publications(first: 5) { nodes { id name } } }`, {});
const onlineStore = pubRes?.publications?.nodes?.find((n: any) => n.name === "Online Store")?.id;
if (!onlineStore) { console.error("Could not find Online Store publication for", domain); process.exit(1); }

const PRODUCT_SET = `mutation Seed($input: ProductSetInput!) {
  productSet(synchronous: true, input: $input) {
    product { id handle }
    userErrors { field message }
  }
}`;
const PUBLISH = `mutation Pub($id: ID!, $pid: ID!) {
  publishablePublish(id: $id, input: [{ publicationId: $pid }]) { userErrors { field message } }
}`;
const CREATE_COLL = `mutation Coll($input: CollectionInput!) {
  collectionCreate(input: $input) { collection { id handle } userErrors { field message } }
}`;
const ADD_TO_COLL = `mutation Add($id: ID!, $ids: [ID!]!) {
  collectionAddProducts(id: $id, productIds: $ids) { userErrors { field message } }
}`;

const productIds: string[] = [];
let ok = 0;
for (const p of catalog.products) {
  const colorNames: string[] = p.colors?.length ? p.colors : ["Default"];
  const input: Record<string, unknown> = {
    title: p.title,
    handle: p.handle,
    descriptionHtml: `<p>${p.desc}</p><p>${p.spec}</p>`,
    productType: p.type,
    vendor: catalog.vendor || "Waypoint",
    status: "ACTIVE",
    metafields: [{ namespace: "custom", key: "product_code", type: "single_line_text_field", value: p.code }],
    productOptions: [{ name: "Color", position: 1, values: colorNames.map((c: string) => ({ name: c })) }],
    variants: colorNames.map((c: string) => ({
      optionValues: [{ optionName: "Color", name: c }],
      price: money(p.price),
      compareAtPrice: p.compareAt ? money(p.compareAt) : null,
      sku: `${p.code}${colorNames.length > 1 ? "-" + c.toUpperCase().slice(0, 3) : ""}`,
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
    gql(PUBLISH, { id, pid: onlineStore });
    productIds.push(id);
    console.log(`✓ ${p.handle} → ${id.split("/").pop()}  $${money(p.price)}  ${colorNames.length} variant(s)`);
    ok++;
  } catch (e: any) {
    console.log(`✗ ${p.handle}: ${(e.stderr || e.message || "").toString().slice(0, 200)}`);
  }
}
console.log(`\nSeeded ${ok}/${catalog.products.length} products on ${domain}.`);

// Collections: New Arrivals (all) + one per distinct product type
async function makeCollection(title: string, handle: string, descriptionHtml: string, ids: string[]) {
  const res = gql(CREATE_COLL, { input: { title, handle, descriptionHtml } });
  const errs = res?.collectionCreate?.userErrors ?? [];
  const id = res?.collectionCreate?.collection?.id;
  if (!id) { console.log(`✗ collection ${handle}: ${JSON.stringify(errs)}`); return; }
  if (ids.length) {
    const a = gql(ADD_TO_COLL, { id, ids });
    const ae = a?.collectionAddProducts?.userErrors ?? [];
    if (ae.length) console.log(`  add err: ${JSON.stringify(ae)}`);
  }
  gql(PUBLISH, { id, pid: onlineStore });
  console.log(`✓ collection ${handle} → ${id.split("/").pop()}  (${ids.length} products)`);
}

if (catalog.collections) {
  for (const c of catalog.collections) {
    const ids = catalog.products
      .filter((p: any) => c.types.includes(p.type))
      .map((p: any) => productIds[catalog.products.indexOf(p)])
      .filter(Boolean);
    await makeCollection(c.title, c.handle, c.description, ids);
  }
}
await makeCollection("New Arrivals", "new-arrivals", `<p>The latest drop.</p>`, productIds);

console.log(`\nDone. Swatches for reference: ${JSON.stringify(swatches)}`);
