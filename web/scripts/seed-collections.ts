// Create the 3 storefront collections on happy-kinetik. Run from project root:
// bun run web/scripts/seed-collections.ts
import { execFileSync } from "node:child_process";

const ONLINE_STORE = "gid://shopify/Publication/174227718204";
const gql = (query: string, vars: Record<string, unknown>): any =>
  JSON.parse(execFileSync("teifi-shopify-connect", ["graphql", "--query", query, "--vars", JSON.stringify(vars)], { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }));

const CREATE = `mutation Coll($input: CollectionInput!) {
  collectionCreate(input: $input) { collection { id handle } userErrors { field message } }
}`;
const ADD = `mutation Add($id: ID!, $ids: [ID!]!) {
  collectionAddProducts(id: $id, productIds: $ids) { userErrors { field message } }
}`;
const PUBLISH = `mutation Pub($id: ID!, $pid: ID!) {
  publishablePublish(id: $id, input: [{ publicationId: $pid }]) { userErrors { field message } }
}`;

const typeRule = (types: string[]) => ({
  appliedDisjunctively: true,
  rules: types.map((t) => ({ column: "TYPE", relation: "EQUALS", condition: t })),
});

async function make(input: Record<string, unknown>, productIds?: string[]) {
  const res = gql(CREATE, { input });
  const errs = res?.collectionCreate?.userErrors ?? [];
  const id = res?.collectionCreate?.collection?.id;
  if (!id) { console.log(`✗ ${input.handle}: ${JSON.stringify(errs)}`); return; }
  if (productIds?.length) {
    const a = gql(ADD, { id, ids: productIds });
    const ae = a?.collectionAddProducts?.userErrors ?? [];
    if (ae.length) console.log(`  add err: ${JSON.stringify(ae)}`);
  }
  gql(PUBLISH, { id, pid: ONLINE_STORE });
  console.log(`✓ ${input.handle} → ${id.split("/").pop()}  published`);
}

// all product ids for the manual new-arrivals collection
const all = gql(`{ products(first: 50) { nodes { id } } }`, {});
const allIds: string[] = (all?.products?.nodes ?? []).map((n: any) => n.id);

await make({ title: "New Arrivals", handle: "new-arrivals", descriptionHtml: "<p>The latest Kinetik drop.</p>" }, allIds);
await make({ title: "Apparel", handle: "apparel", descriptionHtml: "<p>Technical apparel, field-tested.</p>", ruleSet: typeRule(["Outerwear", "Bottoms", "Bags", "Footwear", "Accessories", "Tops"]) });
await make({ title: "Tech", handle: "tech", descriptionHtml: "<p>Audio and wearables.</p>", ruleSet: typeRule(["Audio", "Wearables", "Tech"]) });

console.log(`\nLinked ${allIds.length} products into New Arrivals.`);
