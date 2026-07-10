// Create one blog article with a hero image.
// Run: bun run web/scripts/add-blog-article.ts --domain <shop.myshopify.com> --spec <path-to-json>
// spec.json: { blogId, title, handle, summary, body, authorName, tags, publishDate,
//              imagePath, imageFilename }
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
  console.error("Usage: bun run add-blog-article.ts --domain <shop.myshopify.com> --spec <path.json>");
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

async function main() {
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

  const CREATE = `mutation($article: ArticleCreateInput!) {
    articleCreate(article: $article) {
      article { id handle title image { url } }
      userErrors { field message }
    }
  }`;
  const article = {
    blogId: spec.blogId,
    title: spec.title,
    handle: spec.handle,
    body: spec.body,
    summary: spec.summary,
    isPublished: true,
    publishDate: spec.publishDate,
    author: { name: spec.authorName },
    tags: spec.tags ?? [],
    image: { url: target.resourceUrl, altText: spec.title },
  };
  const res = gql(CREATE, { article });
  const errs = res?.articleCreate?.userErrors ?? [];
  const created = res?.articleCreate?.article;
  if (errs.length || !created?.id) {
    console.log(`✗ ${spec.handle}: ${JSON.stringify(errs)}`);
    process.exit(1);
  }
  console.log(`✓ ${spec.title} → ${created.id.split("/").pop()}  image:${created.image ? "yes" : "no"}`);
}

main().catch((e) => {
  console.log(`✗ ${spec?.handle}: ${e.stack || e.message || e}`);
  process.exit(1);
});
