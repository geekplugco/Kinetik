import { registerSection } from "../registry";
import { RichText } from "./rich-text";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";

export function registerSections(): void {
  registerSection("rich-text", RichText);
  registerSection("announcement-bar", AnnouncementBar);
  registerSection("header", Header);
}

registerSections();
