// Upload + attach generated hero images to a seeded store's products.
// Run: bun run web/scripts/seed-store-images.ts --domain <shop.myshopify.com> --catalog <path.json> --dir <uploads-subdir>
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const domain = flag("domain");
const catalogPath = flag("catalog");
const dir = flag("dir");
if (!domain || !catalogPath || !dir) {
  console.error("Usage: bun run web/scripts/seed-store-images.ts --domain <shop> --catalog <path.json> --dir <uploads-subdir>");
  process.exit(1);
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const PUBLIC = `web/public/uploads/${dir}`;
const files = readdirSync(PUBLIC).filter((f) => f.endsWith(".png")).sort();

const gql = (query: string, vars: Record<string, unknown>): any =>
  JSON.parse(execFileSync("teifi-shopify-connect", ["graphql", "--domain", domain, "--query", query, "--vars", JSON.stringify(vars)], { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }));

const STAGE = `mutation Stage($input: [StagedUploadInput!]!) {
  stagedUploadsCreate(input: $input) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } }
}`;
const CREATE_MEDIA = `mutation Media($id: ID!, $media: [CreateMediaInput!]!) {
  productCreateMedia(productId: $id, media: $media) { media { id status } mediaUserErrors { field message } }
}`;

function stageAndUpload(filename: string): string {
  const st = gql(STAGE, { input: [{ filename, mimeType: "image/png", resource: "IMAGE", httpMethod: "POST" }] });
  const target = st?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) throw new Error("no staged target: " + JSON.stringify(st?.stagedUploadsCreate?.userErrors));
  const curlArgs = ["-s", "-X", "POST", target.url];
  for (const p of target.parameters) { curlArgs.push("-F", `${p.name}=${p.value}`); }
  curlArgs.push("-F", `file=@${PUBLIC}/${filename}`);
  execFileSync("curl", curlArgs, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  return target.resourceUrl;
}

let ok = 0;
catalog.products.forEach((p: any, i: number) => {
  const file = files[i];
  if (!file) { console.log(`✗ ${p.handle}: no image file at index ${i}`); return; }
  const idRes = gql(`query($h:String!){ productByHandle(handle:$h){ id } }`, { h: p.handle });
  const id = idRes?.productByHandle?.id;
  if (!id) { console.log(`✗ ${p.handle}: not found on store`); return; }
  try {
    const resourceUrl = stageAndUpload(file);
    const m = gql(CREATE_MEDIA, { id, media: [{ originalSource: resourceUrl, mediaContentType: "IMAGE", alt: p.title }] });
    const errs = m?.productCreateMedia?.mediaUserErrors ?? [];
    console.log(`${errs.length ? "✗" : "✓"} ${p.handle} <- ${file}${errs.length ? "  ERR:" + JSON.stringify(errs) : ""}`);
    if (!errs.length) ok++;
  } catch (e: any) {
    console.log(`✗ ${p.handle}: ${(e.message || "").slice(0, 160)}`);
  }
});
console.log(`\nAttached images to ${ok}/${catalog.products.length} products on ${domain}.`);
