import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const GUARD = join(process.env.HOME ?? "", ".claude/skills/teifi-theme-json/src/validate.mjs");

function walk(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (entry.endsWith(".json")) acc.push(full);
  }
  return acc;
}

if (!existsSync(GUARD)) {
  console.error(`[validate] /tjson guard not found at ${GUARD}`);
  process.exit(2);
}

const files = walk("theme");
let failed = 0;
for (const file of files) {
  const r = spawnSync("node", [GUARD, "auto", file], { encoding: "utf8" });
  if (!r.stdout.includes("[PASS]")) {
    failed++;
    console.log(r.stdout.trim());
  }
}

console.log(`\n[validate] ${files.length} theme JSON files checked · ${failed} failed`);
console.log("[validate] Phase 2 will add: shopify theme check + Lighthouse CI (>=60) + ta11y AA on the ported Liquid theme.");
process.exit(failed ? 1 : 0);
