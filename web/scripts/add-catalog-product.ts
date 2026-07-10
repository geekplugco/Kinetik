// Create one catalog product end-to-end: staged image upload -> productSet
// (product + variants + metafield + media) -> poll media ready -> publish ->
// add to collections. Used to expand demo store catalogs product-by-product.
// Run: bun run web/scripts/add-catalog-product.ts --domain <shop.myshopify.com> --spec <path-to-json>
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const domain = flag("domain");
const specPath = flag("spec");
if (!domain || !specPath) {
  console.error("Usage: bun run add-catalog-product.ts --domain <shop.myshopify.com> --spec <path.json>");
  process.exit(1);
}
const spec = JSON.parse(readFileSync(specPath, "utf8"));

function gql(query: string, vars: Record<string, unknown>): any {
  const out = execFileSync(
    "teifi-shopify-connect",
    ["graphql", "--domain", domain as string, "--query", query, "--vars", JSON.stringify(vars)],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  return JSON.parse(out);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const money = (n: number) => n.toFixed(2);

async function main() {
  const pubRes = gql(`{ publications(first: 5) { nodes { id name } } }`, {});
  const onlineStore = pubRes?.publications?.nodes?.find((n: any) => n.name === "Online Store")?.id;
  if (!onlineStore) {
    console.error("✗ Could not find Online Store publication for", domain);
    process.exit(1);
  }

  const STAGE = `mutation Stage($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } }
  }`;
  const st = gql(STAGE, {
    input: [{ filename: spec.imageFilename, mimeType: "image/png", resource: "IMAGE", httpMethod: "POST" }],
  });
  const target = st?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) {
    console.log(`✗ ${spec.handle}: stage upload failed ${JSON.stringify(st)}`);
    process.exit(1);
  }
  const curlArgs = ["-s", "-X", "POST", target.url];
  for (const p of target.parameters) curlArgs.push("-F", `${p.name}=${p.value}`);
  curlArgs.push("-F", `file=@${spec.imagePath}`);
  execFileSync("curl", curlArgs, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });

  const colorNames: string[] = spec.colors?.length ? spec.colors : ["Default"];
  const variants = colorNames.map((c: string) => ({
    optionValues: [{ optionName: "Color", name: c }],
    price: money(spec.price),
    compareAtPrice: spec.compareAtPrice ? money(spec.compareAtPrice) : null,
    sku: `${spec.code}${colorNames.length > 1 ? "-" + c.toUpperCase().slice(0, 3) : ""}`,
  }));

  const input: Record<string, unknown> = {
    title: spec.title,
    handle: spec.handle,
    descriptionHtml: spec.descriptionHtml,
    productType: spec.productType,
    vendor: spec.vendor,
    status: "ACTIVE",
    metafields: [{ namespace: "custom", key: "product_code", type: "single_line_text_field", value: spec.code }],
    files: [{ filename: spec.imageFilename, contentType: "IMAGE", originalSource: target.resourceUrl, alt: spec.title }],
    productOptions: [{ name: "Color", position: 1, values: colorNames.map((c: string) => ({ name: c })) }],
    variants,
  };

  const PRODUCT_SET = `mutation Seed($input: ProductSetInput!) {
    productSet(synchronous: true, input: $input) {
      product { id handle media(first: 5) { nodes { id mediaContentType ... on MediaImage { status } } } }
      userErrors { field message }
    }
  }`;
  const res = gql(PRODUCT_SET, { input });
  const errs = res?.productSet?.userErrors ?? [];
  const product = res?.productSet?.product;
  if (errs.length || !product?.id) {
    console.log(`✗ ${spec.handle}: ${JSON.stringify(errs)}`);
    process.exit(1);
  }
  const productId = product.id;

  let mediaId = product.media?.nodes?.[0]?.id;
  let mediaStatus = product.media?.nodes?.[0]?.status;
  for (let i = 0; i < 30 && mediaId && mediaStatus !== "READY"; i++) {
    await sleep(2000);
    const check = gql(`query($id: ID!) { node(id: $id) { ... on MediaImage { id status } } }`, { id: mediaId });
    mediaStatus = check?.node?.status;
    if (mediaStatus === "FAILED") {
      console.log(`  ! media FAILED for ${spec.handle}`);
      break;
    }
  }

  gql(
    `mutation Pub($id: ID!, $pid: ID!) { publishablePublish(id: $id, input: [{ publicationId: $pid }]) { userErrors { field message } } }`,
    { id: productId, pid: onlineStore }
  );

  const collAll = gql(`{ collections(first: 50) { nodes { id handle } } }`, {});
  const collMap: Record<string, string> = {};
  for (const n of collAll?.collections?.nodes ?? []) collMap[n.handle] = n.id;
  const joined: string[] = [];
  for (const handle of spec.collections ?? []) {
    const collId = collMap[handle];
    if (!collId) {
      console.log(`  ! collection not found: ${handle}`);
      continue;
    }
    const addRes = gql(
      `mutation Add($id: ID!, $ids: [ID!]!) { collectionAddProducts(id: $id, productIds: $ids) { userErrors { field message } } }`,
      { id: collId, ids: [productId] }
    );
    const ae = addRes?.collectionAddProducts?.userErrors ?? [];
    if (ae.length) console.log(`  ! add to ${handle} err: ${JSON.stringify(ae)}`);
    else joined.push(handle);
  }

  console.log(
    `✓ ${spec.title} (${spec.code}) → ${productId.split("/").pop()}  $${money(spec.price)}  media:${mediaStatus}  collections:[${joined.join(",")}]`
  );
}

main().catch((e) => {
  console.log(`✗ ${spec?.handle}: ${e.stack || e.message || e}`);
  process.exit(1);
});
