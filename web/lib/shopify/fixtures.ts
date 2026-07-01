import type { Product, Variant, Collection, Cart, Shop, Menu, ShopifyContextValue, Article, Page } from "./objects";
import { productDescriptions } from "./descriptions";

const INK = "#0A0A0A";
const VOLT = "#CCFF00";

interface CatalogEntry {
  handle: string;
  title: string;
  code: string;
  type: string;
  price: number;
  compareAt?: number;
  badge?: string;
  spec: string;
  colors: { name: string; swatch: string }[];
  img: string;
  desc?: string;
}

const catalog: CatalogEntry[] = [
  { handle: "shell-jacket", title: "Shell-01 Hardshell", code: "KX-SHELL-01", type: "Outerwear", price: 33600, compareAt: 42000, spec: "Gore-Tex 3L · 480g", colors: [{ name: "Ink", swatch: INK }, { name: "Volt", swatch: VOLT }], img: "card-01-shell-jacket.png" },
  { handle: "cargo-pants", title: "Cargo Tech Pant", code: "KX-PANT-02", type: "Bottoms", price: 21000, badge: "New", spec: "4-way stretch · taped", colors: [{ name: "Graphite", swatch: "#3A3A3A" }, { name: "Ink", swatch: INK }], img: "card-02-cargo-pants.png" },
  { handle: "utility-vest", title: "Utility Vest 6P", code: "KX-VEST-03", type: "Outerwear", price: 18800, compareAt: 23500, spec: "6-pocket · ripstop", colors: [{ name: "Ink", swatch: INK }], img: "card-03-utility-vest.png" },
  { handle: "sling-bag", title: "Sling 4L", code: "KX-BAG-04", type: "Bags", price: 14500, badge: "New", spec: "CORDURA · 4L", colors: [{ name: "Ink", swatch: INK }], img: "card-04-sling-bag.png" },
  { handle: "sneakers", title: "Trail Runner XS", code: "KX-SHOE-05", type: "Footwear", price: 24000, compareAt: 30000, spec: "Vibram · 280g", colors: [{ name: "Ink", swatch: INK }, { name: "Bone", swatch: "#EFECE2" }], img: "card-05-sneakers.png" },
  { handle: "cap", title: "6-Panel Field Cap", code: "KX-CAP-06", type: "Accessories", price: 6500, spec: "Cotton twill · strap", colors: [{ name: "Ink", swatch: INK }], img: "card-06-cap.png" },
  { handle: "headphones", title: "Field Monitors", code: "KX-AUD-07", type: "Audio", price: 29000, compareAt: 34000, spec: "ANC · 40h battery", colors: [{ name: "Ink", swatch: INK }], img: "card-07-headphones.png" },
  { handle: "earbuds", title: "Pulse Earbuds", code: "KX-AUD-08", type: "Audio", price: 16000, badge: "New", spec: "IPX5 · 32h case", colors: [{ name: "Ink", swatch: INK }], img: "card-08-earbuds.png" },
  { handle: "smartwatch", title: "Kinetik Watch", code: "KX-WTCH-09", type: "Wearables", price: 38000, spec: "GPS · 18h active", colors: [{ name: "Ink", swatch: INK }, { name: "Volt", swatch: VOLT }], img: "card-09-smartwatch.png" },
  { handle: "speaker", title: "Field Speaker 02", code: "KX-SPK-10", type: "Audio", price: 17500, compareAt: 21500, spec: "IP67 · 24h play", colors: [{ name: "Ink", swatch: INK }], img: "card-10-speaker.png" },
  { handle: "tech-hoodie", title: "Storm Hoodie", code: "KX-HOOD-11", type: "Tops", price: 14800, badge: "New", spec: "Heavyweight loopback · storm hood", colors: [{ name: "Ink", swatch: INK }, { name: "Graphite", swatch: "#3A3A3A" }], img: "card-11-tech-hoodie.png" },
  { handle: "insulated-parka", title: "Field Parka 3L", code: "KX-PARKA-12", type: "Outerwear", price: 48000, compareAt: 56000, spec: "3L insulated · taped seams", colors: [{ name: "Ink", swatch: INK }], img: "card-12-parka.png" },
  { handle: "base-layer", title: "Merino Base LS", code: "KX-BASE-13", type: "Tops", price: 9000, spec: "Merino 200 · flatlock", colors: [{ name: "Charcoal", swatch: "#3A3A3A" }, { name: "Ink", swatch: INK }], img: "card-13-base-layer.png" },
  { handle: "backpack", title: "Roll-Top 22L", code: "KX-PACK-14", type: "Bags", price: 19500, badge: "New", spec: "22L roll-top · weatherproof", colors: [{ name: "Ink", swatch: INK }], img: "card-14-backpack.png" },
  { handle: "hip-pack", title: "Hip Pack 2L", code: "KX-HIP-15", type: "Bags", price: 8500, spec: "2L · weatherproof zip", colors: [{ name: "Ink", swatch: INK }], img: "card-15-hip-pack.png" },
  { handle: "beanie", title: "Merino Beanie", code: "KX-BEAN-16", type: "Accessories", price: 4500, spec: "Merino rib · cuffed", colors: [{ name: "Ink", swatch: INK }, { name: "Graphite", swatch: "#3A3A3A" }], img: "card-16-beanie.png" },
  { handle: "tech-gloves", title: "Touch Gloves", code: "KX-GLOVE-17", type: "Accessories", price: 5500, spec: "Touchscreen · articulated", colors: [{ name: "Ink", swatch: INK }], img: "card-17-gloves.png" },
  { handle: "power-bank", title: "Power Cell 10K", code: "KX-POWER-18", type: "Tech", price: 7900, badge: "New", spec: "10000mAh · USB-C PD", colors: [{ name: "Ink", swatch: INK }, { name: "Volt", swatch: VOLT }], img: "card-18-power-bank.png" },
];

const lifestyleShots: Record<string, string> = {
  "shell-jacket": "onmodel/01-jacket-hood-back.png",
  "utility-vest": "onmodel/03-vest-torso.png",
  "cargo-pants": "onmodel/04-lowerbody-cargo.png",
  "sling-bag": "onmodel/05-sling-worn.png",
  "headphones": "onmodel/06-headphones-back.png",
  "cap": "onmodel/07-cap-shadow.png",
};

export const products: Product[] = catalog.map((c, i) => {
  const mkImg = (src: string, j: number) => ({ id: `img-${i}-${j}`, src: `/uploads/${src}`, alt: c.title, width: 1024, height: 1280 });
  const image = mkImg(c.img, 0);
  const extras = [c.img.replace(/\.png$/, "-b.png")];
  if (lifestyleShots[c.handle]) extras.push(lifestyleShots[c.handle]);
  const images = [image, ...extras.map((src, j) => mkImg(src, j + 1))];
  const variants: Variant[] = c.colors.map((col, j) => ({ id: `v-${i}-${j}`, title: col.name, price: c.price, compare_at_price: c.compareAt, available: true, options: [col.name] }));
  return {
    id: `p-${i}`,
    title: c.title,
    handle: c.handle,
    vendor: "Kinetik",
    type: c.type,
    code: c.code,
    spec: c.spec,
    badge: c.badge,
    description: productDescriptions[c.handle] ?? c.desc ?? `${c.title} — ${c.spec}. Engineered for movement; built monochrome, field-tested.`,
    price: c.price,
    price_min: c.price,
    price_max: c.price,
    compare_at_price: c.compareAt,
    available: true,
    featured_image: image,
    images,
    variants,
    options: ["Color"],
    colors: c.colors,
    tags: [c.type.toLowerCase()],
    url: `/products/${c.handle}`,
  };
});

export const productsByHandle: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.handle, p]),
);

function makeCollection(id: string, title: string, handle: string, description: string, items: Product[]): Collection {
  return {
    id,
    title,
    handle,
    description,
    products: items,
    products_count: items.length,
    featured_image: items[0]?.featured_image,
    url: `/collections/${handle}`,
  };
}

const apparelTypes = ["Outerwear", "Bottoms", "Bags", "Footwear", "Accessories", "Tops"];
export const collection = makeCollection("c-arrivals", "New Arrivals", "new-arrivals", "The latest Kinetik drop.", products);
const apparel = makeCollection("c-apparel", "Apparel", "apparel", "Technical apparel, field-tested.", products.filter((p) => apparelTypes.includes(p.type)));
const tech = makeCollection("c-tech", "Tech", "tech", "Audio and wearables.", products.filter((p) => !apparelTypes.includes(p.type)));

collection.featured_image = { id: "ci-arrivals", src: "/uploads/onmodel/02-fulllook-cropped.png", alt: "New arrivals", width: 1024, height: 1280 };
apparel.featured_image = { id: "ci-apparel", src: "/uploads/onmodel/03-vest-torso.png", alt: "Apparel", width: 1024, height: 1280 };
tech.featured_image = { id: "ci-tech", src: "/uploads/onmodel/06-headphones-back.png", alt: "Tech", width: 1024, height: 1280 };

export const collectionsByHandle: Record<string, Collection> = {
  "new-arrivals": collection,
  apparel,
  tech,
};

export const cart: Cart = {
  items: [
    { id: "li-0", product: products[0], variant: products[0].variants[0], quantity: 1, line_price: products[0].price },
    { id: "li-4", product: products[4], variant: products[4].variants[0], quantity: 2, line_price: products[4].price * 2 },
  ],
  item_count: 3,
  total_price: products[0].price + products[4].price * 2,
  currency: "USD",
};

export const shop: Shop = {
  name: "Kinetik",
  currency: "USD",
  money_format: "${{amount}}",
  domain: "kinetik.example.com",
};

export const mainMenu: Menu = {
  handle: "main-menu",
  title: "Main menu",
  links: [
    {
      title: "New Arrivals",
      url: "/collections/new-arrivals",
      links: [
        { title: "All new", url: "/collections/new-arrivals" },
        { title: "Apparel", url: "/collections/apparel" },
        { title: "Audio", url: "/collections/tech" },
      ],
    },
    {
      title: "Apparel",
      url: "/collections/apparel",
      links: [
        { title: "Outerwear", url: "/collections/apparel" },
        { title: "Bottoms", url: "/collections/apparel" },
        { title: "Footwear", url: "/collections/apparel" },
      ],
    },
    {
      title: "Audio",
      url: "/collections/tech",
      links: [
        { title: "Headphones", url: "/collections/tech" },
        { title: "Earbuds", url: "/collections/tech" },
        { title: "Speakers", url: "/collections/tech" },
      ],
    },
    { title: "Gear", url: "/collections/apparel" },
    { title: "Lookbook", url: "/pages/lookbook" },
  ],
};

export const articles: Article[] = [
  { id: "a1", title: "Field notes: building the FW26 shell", handle: "fw26-shell", excerpt: "How the season's flagship jacket came together.", content: "<p>The shell started as a question: how light can technical protection get?</p><p>Eighteen prototypes later, we had our answer.</p>", author: "Studio", published_at: "2026-05-12", image: "/uploads/onmodel/01-jacket-hood-back.png", url: "/blog/fw26-shell" },
  { id: "a2", title: "On utility and restraint", handle: "utility-restraint", excerpt: "Why we cut three pockets from the cargo pant.", content: "<p>Good design is as much about subtraction as addition.</p>", author: "Studio", published_at: "2026-04-28", image: "/uploads/onmodel/04-lowerbody-cargo.png", url: "/blog/utility-restraint" },
  { id: "a3", title: "The sound of the city", handle: "sound-of-the-city", excerpt: "Tuning the Studio Headphones for the street.", content: "<p>We tuned for movement, not the lab.</p>", author: "Studio", published_at: "2026-04-10", image: "/uploads/onmodel/06-headphones-back.png", url: "/blog/sound-of-the-city" },
];

export const pagesByHandle: Record<string, Page> = {
  about: { title: "About Kinetik", handle: "about", content: "<p>Kinetik builds field-tested apparel and audio for people who move. Technical materials, considered construction, zero noise.</p><p>Designed in studio, tested in the world.</p>" },
  contact: { title: "Contact", handle: "contact", content: "<p>Questions, press, or wholesale — send a note and the studio will reply within two business days.</p>" },
  lookbook: { title: "Lookbook", handle: "lookbook", content: "" },
};

export const shopifyFixture: ShopifyContextValue = {
  shop,
  cart,
  collections: collectionsByHandle,
  products: productsByHandle,
  menus: { "main-menu": mainMenu },
  articles,
  locale: "en-US",
  translations: {},
};
