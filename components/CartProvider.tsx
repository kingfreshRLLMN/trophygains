"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "trophygains-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(storageKey);

    if (savedCart) {
      setItems(JSON.parse(savedCart) as CartItem[]);
    }

    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [hasHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      total,
      count,
      addItem(product) {
        setItems((current) => {
          const existing = current.find((item) => item.id === product.id);

          if (existing) {
            return current.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }

          return [...current, { ...product, quantity: 1 }];
        });
      },
      removeItem(id) {
        setItems((current) => current.filter((item) => item.id !== id));
      },
      clearCart() {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
