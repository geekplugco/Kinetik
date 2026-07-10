// Attach a NEW distinct image to an already-existing product and assign it to
// one specific variant (so each color option shows its own photo / image
// swatch instead of sharing the product's single default image).
//
// IMPORTANT: productSet's `files` field is a full-sync list, not additive —
// omitting an existing media id from `files` DELETES it from the product.
// This script always re-supplies every existing media by `id` alongside the
// new upload so nothing already on the product is lost.
//
// Run: bun run web/scripts/append-variant-image.ts --domain <shop> --spec <path-to-json>
// spec.json: { productId, variantId, imagePath, imageFilename, alt,
//              firstVariantId?, firstVariantMediaId? }
//   - firstVariantId/firstVariantMediaId: optional — if the product's
//     existing (first) variant doesn't yet have an explicit variant image,
//     pass its variant id + the existing media id so it gets one too.
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
  console.error("Usage: bun run append-variant-image.ts --domain <shop.myshopify.com> --spec <path.json>");
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

async function main() {
  const STAGE = `mutation Stage($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } }
  }`;
  const st = gql(STAGE, {
    input: [{ filename: spec.imageFilename, mimeType: "image/png", resource: "IMAGE", httpMethod: "POST" }],
  });
  const target = st?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) {
    console.log(`✗ ${spec.imageFilename}: stage upload failed ${JSON.stringify(st)}`);
    process.exit(1);
  }
  const curlArgs = ["-s", "-X", "POST", target.url];
  for (const p of target.parameters) curlArgs.push("-F", `${p.name}=${p.value}`);
  curlArgs.push("-F", `file=@${spec.imagePath}`);
  execFileSync("curl", curlArgs, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });

  const before = gql(`query($id: ID!) { product(id: $id) { media(first: 20) { nodes { id } } } }`, { id: spec.productId });
  const existingIds: string[] = (before?.product?.media?.nodes ?? []).map((n: any) => n.id);

  const files = [...existingIds.map((id) => ({ id })), { filename: spec.imageFilename, contentType: "IMAGE", originalSource: target.resourceUrl, alt: spec.alt }];

  const ADD_FILE = `mutation($identifier: ProductSetIdentifiers!, $input: ProductSetInput!) {
    productSet(identifier: $identifier, input: $input, synchronous: true) {
      product { id media(first: 20) { nodes { id mediaContentType ... on MediaImage { status } } } }
      userErrors { field message }
    }
  }`;
  const res = gql(ADD_FILE, { identifier: { id: spec.productId }, input: { files } });
  const errs = res?.productSet?.userErrors ?? [];
  if (errs.length) {
    console.log(`✗ ${spec.imageFilename}: ${JSON.stringify(errs)}`);
    process.exit(1);
  }
  const mediaNodes = res?.productSet?.product?.media?.nodes ?? [];
  const existingSet = new Set(existingIds);
  const newMedia = mediaNodes.find((n: any) => !existingSet.has(n.id));
  if (!newMedia) {
    console.log(`✗ ${spec.imageFilename}: could not identify newly added media among ${mediaNodes.length} nodes (existing: ${existingIds.length})`);
    process.exit(1);
  }
  const mediaId = newMedia.id;

  let status = newMedia.status;
  for (let i = 0; i < 40 && status !== "READY"; i++) {
    await sleep(2000);
    const check = gql(`query($id: ID!) { node(id: $id) { ... on MediaImage { id status } } }`, { id: mediaId });
    status = check?.node?.status;
    if (status === "FAILED") {
      console.log(`  ! media FAILED for ${spec.imageFilename}`);
      break;
    }
  }

  const variantMedia = [{ variantId: spec.variantId, mediaIds: [mediaId] }];
  if (spec.firstVariantId && spec.firstVariantMediaId) {
    variantMedia.push({ variantId: spec.firstVariantId, mediaIds: [spec.firstVariantMediaId] });
  }

  const APPEND = `mutation($productId: ID!, $variantMedia: [ProductVariantAppendMediaInput!]!) {
    productVariantAppendMedia(productId: $productId, variantMedia: $variantMedia) {
      userErrors { field message }
    }
  }`;
  const appendRes = gql(APPEND, { productId: spec.productId, variantMedia });
  const appendErrs = appendRes?.productVariantAppendMedia?.userErrors ?? [];
  if (appendErrs.length) {
    console.log(`✗ append ${spec.imageFilename}: ${JSON.stringify(appendErrs)}`);
    process.exit(1);
  }

  // Keep the original (first) media as the product's featured image.
  if (existingIds.length > 0) {
    gql(`mutation($id: ID!, $moves: [MoveInput!]!) { productReorderMedia(id: $id, moves: $moves) { userErrors { field message } } }`, {
      id: spec.productId,
      moves: [{ id: existingIds[0], newPosition: "0" }],
    });
  }

  console.log(`✓ ${spec.imageFilename} → media:${status} appended to variant ${spec.variantId.split("/").pop()} (product now has ${existingIds.length + 1} media)`);
}

main().catch((e) => {
  console.log(`✗ ${spec?.imageFilename}: ${e.stack || e.message || e}`);
  process.exit(1);
});
