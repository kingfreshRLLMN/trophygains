"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const goals = ["Cut", "Maintain", "Bulk"] as const;
const calories = [1500, 2000, 2500, 3000, 3500];

export function NutritionFilters({ products }: { products: Product[] }) {
  const [goal, setGoal] = useState<Product["goal"] | "all">("all");
  const [calorie, setCalorie] = useState<number | "all">("all");

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const goalMatch = goal === "all" || product.goal === goal;
        const calorieMatch = calorie === "all" || product.calories === calorie;
        return goalMatch && calorieMatch;
      }),
    [calorie, goal, products],
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <button className={goal === "all" ? "btn-gold" : "btn-secondary"} onClick={() => setGoal("all")}>
          Alle doelen
        </button>
        {goals.map((item) => (
          <button className={goal === item ? "btn-gold" : "btn-secondary"} key={item} onClick={() => setGoal(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="mb-8 flex flex-wrap gap-3">
        <button className={calorie === "all" ? "btn-gold" : "btn-secondary"} onClick={() => setCalorie("all")}>
          Alle kcal
        </button>
        {calories.map((item) => (
          <button className={calorie === item ? "btn-gold" : "btn-secondary"} key={item} onClick={() => setCalorie(item)}>
            {item}
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
