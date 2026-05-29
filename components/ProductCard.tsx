"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.article className="premium-card flex h-full flex-col p-5" whileHover={{ y: -6 }} transition={{ duration: 0.18 }}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-md border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-gold-soft">
          {product.badge}
        </span>
        <span className="text-xl font-black">{formatPrice(product.price)}</span>
      </div>
      <h3 className="text-2xl font-black">{product.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{product.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-zinc-300">
        {product.days ? <span className="rounded-md bg-white/10 px-3 py-2">{product.days} dagen</span> : null}
        {product.goal ? <span className="rounded-md bg-white/10 px-3 py-2">{product.goal}</span> : null}
        {product.calories ? <span className="rounded-md bg-white/10 px-3 py-2">{product.calories} kcal</span> : null}
        <span className="rounded-md bg-white/10 px-3 py-2">PDF download</span>
      </div>
      <button className="btn-gold mt-6 w-full" onClick={() => addItem(product)}>
        Koop product <ShoppingBag className="h-4 w-4" />
      </button>
    </motion.article>
  );
}
