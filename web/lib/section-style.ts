import type { CSSProperties } from "react";
import type { SettingsValues } from "./types";

export function sectionStyle(settings: SettingsValues): CSSProperties {
  const vars: Record<string, string> = {};
  if (typeof settings.padding_top === "number") vars["--pt"] = `${settings.padding_top}px`;
  if (typeof settings.padding_bottom === "number") vars["--pb"] = `${settings.padding_bottom}px`;
  if (settings.columns_desktop != null) vars["--cols-desktop"] = String(settings.columns_desktop);
  if (settings.columns_mobile != null) vars["--cols-mobile"] = String(settings.columns_mobile);
  return vars as CSSProperties;
}
