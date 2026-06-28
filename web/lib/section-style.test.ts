import { test, expect } from "bun:test";
import { sectionStyle } from "./section-style";

test("maps padding settings to CSS variables in px", () => {
  const s = sectionStyle({ padding_top: 48, padding_bottom: 36 }) as Record<string, string>;
  expect(s["--pt"]).toBe("48px");
  expect(s["--pb"]).toBe("36px");
});

test("maps responsive column settings to CSS variables", () => {
  const s = sectionStyle({ columns_desktop: 4, columns_mobile: "2" }) as Record<string, string>;
  expect(s["--cols-desktop"]).toBe("4");
  expect(s["--cols-mobile"]).toBe("2");
});

test("omits variables for absent settings", () => {
  const s = sectionStyle({ heading: "x" }) as Record<string, string>;
  expect(Object.keys(s)).toHaveLength(0);
});
