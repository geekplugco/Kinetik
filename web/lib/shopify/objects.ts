export interface ShopifyImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Variant {
  id: string;
  title: string;
  price: number;
  compare_at_price?: number;
  available: boolean;
  options: string[];
  sku?: string;
  featured_image?: ShopifyImage;
}

export interface SwatchColor {
  name: string;
  swatch: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  type: string;
  code: string;
  spec: string;
  badge?: string;
  description: string;
  price: number;
  price_min: number;
  price_max: number;
  compare_at_price?: number;
  available: boolean;
  featured_image: ShopifyImage;
  images: ShopifyImage[];
  variants: Variant[];
  options: string[];
  colors: SwatchColor[];
  tags: string[];
  url: string;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  products: Product[];
  products_count: number;
  featured_image?: ShopifyImage;
  url: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: Variant;
  quantity: number;
  line_price: number;
}

export interface Cart {
  items: CartItem[];
  item_count: number;
  total_price: number;
  currency: string;
}

export interface LinkItem {
  title: string;
  url: string;
  active?: boolean;
  links?: LinkItem[];
}

export interface Menu {
  handle: string;
  title: string;
  links: LinkItem[];
}

export interface Shop {
  name: string;
  currency: string;
  money_format: string;
  domain: string;
}

export interface Article {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  image: string;
  url: string;
}

export interface Page {
  title: string;
  handle: string;
  content: string;
}

export interface ShopifyContextValue {
  shop: Shop;
  cart: Cart;
  collections: Record<string, Collection>;
  products: Record<string, Product>;
  menus: Record<string, Menu>;
  locale: string;
  translations: Record<string, string>;
  product?: Product;
  collection?: Collection;
  article?: Article;
  page?: Page;
  articles: Article[];
}
