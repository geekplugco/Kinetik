"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product, Variant, CartItem } from "./shopify/objects";
import { cart as cartFixture } from "./shopify/fixtures";

interface UIState {
  lines: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, variant: Variant, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  quickView: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  popupOpen: boolean;
  closePopup: () => void;
}

const Ctx = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartItem[]>(cartFixture.items.map((i) => ({ ...i })));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const addToCart = useCallback((product: Product, variant: Variant, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variant.id === variant.id);
      if (existing) {
        return prev.map((l) =>
          l.variant.id === variant.id ? { ...l, quantity: l.quantity + qty, line_price: variant.price * (l.quantity + qty) } : l,
        );
      }
      return [...prev, { id: `li-${variant.id}`, product, variant, quantity: qty, line_price: variant.price * qty }];
    });
    setQuickView(null);
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    const next = Math.max(1, qty);
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, quantity: next, line_price: l.variant.price * next } : l)));
  }, []);

  const removeLine = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);

  const value = useMemo<UIState>(() => ({
    lines,
    cartCount: lines.reduce((n, l) => n + l.quantity, 0),
    cartTotal: lines.reduce((n, l) => n + l.line_price, 0),
    addToCart,
    updateQty,
    removeLine,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    searchOpen,
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    quickView,
    openQuickView: (p: Product) => setQuickView(p),
    closeQuickView: () => setQuickView(null),
    popupOpen,
    closePopup: () => setPopupOpen(false),
  }), [lines, cartOpen, searchOpen, quickView, popupOpen, addToCart, updateQty, removeLine]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI(): UIState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
