import { registerSection } from "../registry";
import { RichText } from "./rich-text";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { Hero } from "./hero";
import { Marquee } from "./marquee";
import { FeaturedCollection } from "./featured-collection";

export function registerSections(): void {
  registerSection("rich-text", RichText);
  registerSection("announcement-bar", AnnouncementBar);
  registerSection("header", Header);
  registerSection("hero", Hero);
  registerSection("marquee", Marquee);
  registerSection("featured-collection", FeaturedCollection);
}

registerSections();
