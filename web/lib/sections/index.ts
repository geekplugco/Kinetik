import { registerSection } from "../registry";
import { RichText } from "./rich-text";

export function registerSections(): void {
  registerSection("rich-text", RichText);
}

registerSections();
