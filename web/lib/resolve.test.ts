import { test, expect } from "bun:test";
import { resolveTemplate } from "./resolve";
import type { Template } from "./types";

const tpl: Template = {
  sections: {
    hero: { type: "hero", settings: { heading: "Hi" } },
    grid: {
      type: "product-grid",
      blocks: {
        b1: { type: "item", settings: { title: "A" } },
        b2: { type: "item", settings: { title: "B" } },
      },
      block_order: ["b2", "b1"],
    },
    hidden: { type: "newsletter", disabled: true },
    footer: { type: "footer" },
  },
  order: ["hero", "grid", "hidden", "footer", "ghost"],
};

test("resolves sections in template order, skipping disabled + missing", () => {
  const out = resolveTemplate(tpl);
  expect(out.map((s) => s.id)).toEqual(["hero", "grid", "footer"]);
});

test("resolves blocks following block_order", () => {
  const grid = resolveTemplate(tpl).find((s) => s.id === "grid")!;
  expect(grid.blocks.map((b) => b.id)).toEqual(["b2", "b1"]);
  expect(grid.blocks[0].settings.title).toBe("B");
  expect(grid.blocks[1].settings.title).toBe("A");
});

test("defaults settings/blocks to empty when absent", () => {
  const footer = resolveTemplate(tpl).find((s) => s.id === "footer")!;
  expect(footer.settings).toEqual({});
  expect(footer.blocks).toEqual([]);
});
