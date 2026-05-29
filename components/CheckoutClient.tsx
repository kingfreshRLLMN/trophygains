"use client";

import { Mail, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "@/components/CartProvider";
import { buildDeliveryEmail } from "@/lib/emailDelivery";
import { formatPrice } from "@/lib/products";

export function CheckoutClient() {
  const { items, total, removeItem, clearCart } = useCart();
  const delivery = useMemo(() => buildDeliveryEmail(items), [items]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="premium-card p-6">
        <h2 className="text-2xl font-black">Shopping cart</h2>
        <div className="mt-6 grid gap-4">
          {items.length === 0 ? (
            <p className="text-zinc-400">Je winkelwagen is nog leeg.</p>
          ) : (
            items.map((item) => (
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4" key={item.id}>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-zinc-400">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <button className="rounded-md border border-white/15 p-3 hover:border-gold/60" onClick={() => removeItem(item.id)} aria-label="Remove item">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <aside className="premium-card h-fit p-6">
        <h2 className="text-2xl font-black">Checkout</h2>
        <div className="mt-6 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-zinc-400">Totaal</span>
          <span className="text-3xl font-black text-gold-soft">{formatPrice(total)}</span>
        </div>
        <label className="mt-6 block text-sm font-bold text-zinc-300" htmlFor="email">
          E-mailadres
        </label>
        <input className="field mt-2" id="email" placeholder="jij@example.com" type="email" />
        <button className="btn-gold mt-5 w-full" disabled={items.length === 0}>
          Mollie checkout placeholder
        </button>
        <button className="btn-secondary mt-3 w-full" onClick={clearCart} disabled={items.length === 0}>
          Winkelwagen legen
        </button>
        <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
          <div className="mb-3 flex items-center gap-2 font-bold text-white">
            <Mail className="h-4 w-4 text-gold" /> Email delivery voorbereid
          </div>
          <p>{delivery.subject}</p>
          <p className="mt-2">{delivery.downloadLinks.length} downloadlink(s) klaar voor verzending.</p>
        </div>
      </aside>
    </div>
  );
}
