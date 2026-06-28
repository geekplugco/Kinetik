import type { Product, Collection, Cart, Shop, Menu, ShopifyContextValue, Article, Page } from "./objects";

const catalog: { handle: string; title: string; vendor: string; type: string; price: number; img: string }[] = [
  { handle: "shell-jacket", title: "Shell Jacket", vendor: "Kinetik", type: "Outerwear", price: 24800, img: "card-01-shell-jacket.png" },
  { handle: "cargo-pants", title: "Cargo Pants", vendor: "Kinetik", type: "Bottoms", price: 14000, img: "card-02-cargo-pants.png" },
  { handle: "utility-vest", title: "Utility Vest", vendor: "Kinetik", type: "Outerwear", price: 16500, img: "card-03-utility-vest.png" },
  { handle: "sling-bag", title: "Sling Bag", vendor: "Kinetik", type: "Bags", price: 8900, img: "card-04-sling-bag.png" },
  { handle: "sneakers", title: "Trail Sneakers", vendor: "Kinetik", type: "Footwear", price: 18000, img: "card-05-sneakers.png" },
  { handle: "cap", title: "Field Cap", vendor: "Kinetik", type: "Accessories", price: 4500, img: "card-06-cap.png" },
  { handle: "headphones", title: "Studio Headphones", vendor: "Kinetik", type: "Audio", price: 29900, img: "card-07-headphones.png" },
  { handle: "earbuds", title: "Wireless Earbuds", vendor: "Kinetik", type: "Audio", price: 13900, img: "card-08-earbuds.png" },
  { handle: "smartwatch", title: "Smartwatch", vendor: "Kinetik", type: "Wearables", price: 34900, img: "card-09-smartwatch.png" },
  { handle: "speaker", title: "Portable Speaker", vendor: "Kinetik", type: "Audio", price: 11900, img: "card-10-speaker.png" },
];

export const products: Product[] = catalog.map((c, i) => {
  const image = { id: `img-${i}`, src: `/uploads/${c.img}`, alt: c.title, width: 1200, height: 1500 };
  const variant = { id: `v-${i}`, title: "Default", price: c.price, available: true, options: ["Default"] };
  return {
    id: `p-${i}`,
    title: c.title,
    handle: c.handle,
    vendor: c.vendor,
    type: c.type,
    description: `${c.title} — engineered for movement.`,
    price: c.price,
    price_min: c.price,
    price_max: c.price,
    available: true,
    featured_image: image,
    images: [image],
    variants: [variant],
    options: ["Title"],
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

const apparelTypes = ["Outerwear", "Bottoms", "Bags", "Footwear", "Accessories"];
export const collection = makeCollection("c-arrivals", "New Arrivals", "new-arrivals", "The latest Kinetik drop.", products);
const apparel = makeCollection("c-apparel", "Apparel", "apparel", "Technical apparel, field-tested.", products.filter((p) => apparelTypes.includes(p.type)));
const tech = makeCollection("c-tech", "Tech", "tech", "Audio and wearables.", products.filter((p) => !apparelTypes.includes(p.type)));

collection.featured_image = { id: "ci-arrivals", src: "/uploads/hero-editorial.png", alt: "New arrivals", width: 1200, height: 800 };
apparel.featured_image = { id: "ci-apparel", src: "/uploads/card-03-utility-vest.png", alt: "Apparel", width: 1200, height: 1500 };
tech.featured_image = { id: "ci-tech", src: "/uploads/card-07-headphones.png", alt: "Tech", width: 1200, height: 1500 };

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
      title: "Shop",
      url: "/collections/new-arrivals",
      links: [
        { title: "New arrivals", url: "/collections/new-arrivals" },
        { title: "Apparel", url: "/collections/apparel" },
        { title: "Tech", url: "/collections/tech" },
        { title: "All collections", url: "/collections" },
      ],
    },
    {
      title: "Apparel",
      url: "/collections/apparel",
      links: [
        { title: "Outerwear", url: "/collections/apparel" },
        { title: "Bottoms", url: "/collections/apparel" },
        { title: "Bags", url: "/collections/apparel" },
        { title: "Footwear", url: "/collections/apparel" },
      ],
    },
    {
      title: "Tech",
      url: "/collections/tech",
      links: [
        { title: "Audio", url: "/collections/tech" },
        { title: "Wearables", url: "/collections/tech" },
      ],
    },
    { title: "Journal", url: "/blog" },
    { title: "About", url: "/pages/about" },
  ],
};

export const articles: Article[] = [
  { id: "a1", title: "Field notes: building the FW26 shell", handle: "fw26-shell", excerpt: "How the season's flagship jacket came together.", content: "<p>The shell started as a question: how light can technical protection get?</p><p>Eighteen prototypes later, we had our answer.</p>", author: "Studio", published_at: "2026-05-12", image: "/uploads/banner-dark-flatlay.png", url: "/blog/fw26-shell" },
  { id: "a2", title: "On utility and restraint", handle: "utility-restraint", excerpt: "Why we cut three pockets from the cargo pant.", content: "<p>Good design is as much about subtraction as addition.</p>", author: "Studio", published_at: "2026-04-28", image: "/uploads/hero-editorial.png", url: "/blog/utility-restraint" },
  { id: "a3", title: "The sound of the city", handle: "sound-of-the-city", excerpt: "Tuning the Studio Headphones for the street.", content: "<p>We tuned for movement, not the lab.</p>", author: "Studio", published_at: "2026-04-10", image: "/uploads/card-07-headphones.png", url: "/blog/sound-of-the-city" },
];

export const pagesByHandle: Record<string, Page> = {
  about: { title: "About Kinetik", handle: "about", content: "<p>Kinetik builds field-tested apparel and audio for people who move. Technical materials, considered construction, zero noise.</p><p>Designed in studio, tested in the world.</p>" },
  contact: { title: "Contact", handle: "contact", content: "<p>Questions, press, or wholesale — send a note and the studio will reply within two business days.</p>" },
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
