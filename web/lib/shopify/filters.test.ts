import { test, expect } from "bun:test";
import { money, t, imageUrl } from "./filters";

test("money formats integer cents as currency", () => {
  expect(money(1999)).toBe("$19.99");
  expect(money(0)).toBe("$0.00");
});

test("money respects currency and locale", () => {
  expect(money(500000, { currency: "EUR", locale: "de-DE" })).toContain("5.000");
});

test("t returns translation, then fallback, then key", () => {
  expect(t({ greeting: "Hi" }, "greeting")).toBe("Hi");
  expect(t({}, "missing", "Fallback")).toBe("Fallback");
  expect(t({}, "bare.key")).toBe("bare.key");
});

test("imageUrl appends width param, preserving existing query", () => {
  expect(imageUrl("/a.png", 200)).toBe("/a.png?width=200");
  expect(imageUrl("/a.png?v=1", 200)).toBe("/a.png?v=1&width=200");
  expect(imageUrl("/a.png")).toBe("/a.png");
});
