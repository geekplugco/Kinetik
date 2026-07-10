// Upload + attach product gallery images on a store. Run from project root:
// bun run web/scripts/seed-images.ts [handle] [--domain <shop.myshopify.com>]
import { execFileSync } from "node:child_process";
import { products } from "../lib/shopify/fixtures";

const args = process.argv.slice(2);
const domainIdx = args.indexOf("--domain");
const domain = domainIdx >= 0 ? args[domainIdx + 1] : undefined;
const only = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--domain");

const PUBLIC = "web/public";
const SKIP = domain ? new Set<string>() : new Set(["shell-jacket"]); // already seeded on happy-kinetik's original validation test

const gql = (query: string, vars: Record<string, unknown>): any =>
  JSON.parse(execFileSync("teifi-shopify-connect", ["graphql", ...(domain ? ["--domain", domain] : []), "--query", query, "--vars", JSON.stringify(vars)], { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }));

const STAGE = `mutation Stage($input: [StagedUploadInput!]!) {
  stagedUploadsCreate(input: $input) {
    stagedTargets { url resourceUrl parameters { name value } }
    userErrors { field message }
  }
}`;
const CREATE_MEDIA = `mutation Media($id: ID!, $media: [CreateMediaInput!]!) {
  productCreateMedia(productId: $id, media: $media) {
    media { id status }
    mediaUserErrors { field message }
  }
}`;

function stageAndUpload(localPath: string, filename: string): string {
  const st = gql(STAGE, { input: [{ filename, mimeType: "image/png", resource: "IMAGE", httpMethod: "POST" }] });
  const target = st?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) throw new Error("no staged target: " + JSON.stringify(st?.stagedUploadsCreate?.userErrors));
  const args = ["-s", "-X", "POST", target.url];
  for (const p of target.parameters) { args.push("-F", `${p.name}=${p.value}`); }
  args.push("-F", `file=@${PUBLIC}/${localPath}`);
  execFileSync("curl", args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  return target.resourceUrl;
}

let okProd = 0, okImg = 0;
for (const p of products) {
  if (only && p.handle !== only) continue;
  if (!only && SKIP.has(p.handle)) continue;
  const idRes = gql(`query($h:String!){ productByHandle(handle:$h){ id } }`, { h: p.handle });
  const id = idRes?.productByHandle?.id;
  if (!id) { console.log(`✗ ${p.handle}: not found on store`); continue; }

  const media: { originalSource: string; mediaContentType: string; alt: string }[] = [];
  for (const img of p.images) {
    const local = img.src.replace(/^\/uploads\//, "uploads/").replace(/^\//, ""); // e.g. uploads/card-01-...
    const file = local.split("/").pop()!;
    try {
      const resourceUrl = stageAndUpload(local, file);
      media.push({ originalSource: resourceUrl, mediaContentType: "IMAGE", alt: p.title });
      okImg++;
    } catch (e: any) { console.log(`  ✗ img ${file}: ${(e.message || "").slice(0, 120)}`); }
  }
  if (media.length) {
    const m = gql(CREATE_MEDIA, { id, media });
    const errs = m?.productCreateMedia?.mediaUserErrors ?? [];
    console.log(`✓ ${p.handle}: ${media.length} image(s)${errs.length ? "  ERR:" + JSON.stringify(errs) : ""}`);
    if (!errs.length) okProd++;
  }
}
console.log(`\nAttached images to ${okProd} products (${okImg} uploads).`);
