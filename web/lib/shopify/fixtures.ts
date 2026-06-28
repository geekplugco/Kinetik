import type { Product, Collection, Cart, Shop, Menu, ShopifyContextValue } from "./objects";

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

export const collection: Collection = {
  id: "c-arrivals",
  title: "New Arrivals",
  handle: "new-arrivals",
  description: "The latest Kinetik drop.",
  products,
  products_count: products.length,
  featured_image: products[0].featured_image,
  url: "/collections/new-arrivals",
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
    { title: "Shop", url: "/collections/new-arrivals" },
    { title: "Apparel", url: "/collections/apparel" },
    { title: "Tech", url: "/collections/tech" },
    { title: "About", url: "/pages/about" },
  ],
};

export const shopifyFixture: ShopifyContextValue = {
  shop,
  cart,
  collections: { "new-arrivals": collection },
  products: productsByHandle,
  menus: { "main-menu": mainMenu },
  locale: "en-US",
  translations: {},
};
