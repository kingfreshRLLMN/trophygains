"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const dayFilters = [2, 3, 4, 5, 6];

export function WorkoutFilters({ products }: { products: Product[] }) {
  const [active, setActive] = useState<number | "all">("all");
  const filtered = active === "all" ? products : products.filter((product) => product.days === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <button className={active === "all" ? "btn-gold" : "btn-secondary"} onClick={() => setActive("all")}>
          Alle
        </button>
        {dayFilters.map((days) => (
          <button className={active === days ? "btn-gold" : "btn-secondary"} key={days} onClick={() => setActive(days)}>
            {days} dagen
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
