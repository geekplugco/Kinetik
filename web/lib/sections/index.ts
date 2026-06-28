import { registerSection } from "../registry";
import { RichText } from "./rich-text";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { Hero } from "./hero";
import { Marquee } from "./marquee";

export function registerSections(): void {
  registerSection("rich-text", RichText);
  registerSection("announcement-bar", AnnouncementBar);
  registerSection("header", Header);
  registerSection("hero", Hero);
  registerSection("marquee", Marquee);
}

registerSections();
