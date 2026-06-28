import { registerSection } from "../registry";
import { RichText } from "./rich-text";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { Hero } from "./hero";
import { Marquee } from "./marquee";
import { FeaturedCollection } from "./featured-collection";
import { Footer } from "./footer";
import { ImageWithText } from "./image-with-text";
import { Multicolumn } from "./multicolumn";
import { Newsletter } from "./newsletter";
import { CollectionList } from "./collection-list";

export function registerSections(): void {
  registerSection("rich-text", RichText);
  registerSection("announcement-bar", AnnouncementBar);
  registerSection("header", Header);
  registerSection("hero", Hero);
  registerSection("marquee", Marquee);
  registerSection("featured-collection", FeaturedCollection);
  registerSection("footer", Footer);
  registerSection("image-with-text", ImageWithText);
  registerSection("multicolumn", Multicolumn);
  registerSection("newsletter", Newsletter);
  registerSection("collection-list", CollectionList);
}

registerSections();
