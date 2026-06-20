"use client";

import { useMemo, useState } from "react";
import { Dumbbell, Flame, RotateCcw, Scale, Trophy } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product, ProductGoal } from "@/lib/types";

const dayFilters = [2, 3, 4, 5, 6];

const goalFilters: Array<{
  value: ProductGoal;
  label: string;
  text: string;
  icon: typeof Dumbbell;
}> = [
  {
    value: "Cut",
    label: "Vetverlies",
    text: "Spiermassa behouden en gericht droger worden.",
    icon: Flame,
  },
  {
    value: "Maintain",
    label: "Onderhoud",
    text: "Sterk, fit en in balans blijven.",
    icon: Scale,
  },
  {
    value: "Bulk",
    label: "Spieropbouw",
    text: "Meer trainingsvolume voor maximale groei.",
    icon: Dumbbell,
  },
  {
    value: "Strength",
    label: "Kracht",
    text: "Sterker worden op de belangrijkste lifts.",
    icon: Trophy,
  },
];

export function WorkoutFilters({ products }: { products: Product[] }) {
  const [activeGoal, setActiveGoal] = useState<ProductGoal | "all">("all");
  const [activeDays, setActiveDays] = useState<number | "all">("all");

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const goalMatches = activeGoal === "all" || product.goal === activeGoal;
        const daysMatch = activeDays === "all" || product.days === activeDays;
        return goalMatches && daysMatch;
      }),
    [activeDays, activeGoal, products],
  );

  const hasFilters = activeGoal !== "all" || activeDays !== "all";

  return (
    <div>
      <div className="premium-card mb-10 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Stap 1</p>
            <h2 className="mt-2 text-2xl font-black">Wat is je hoofddoel?</h2>
          </div>
          {hasFilters ? (
            <button
              className="inline-flex items-center gap-2 self-start text-sm font-bold text-zinc-400 transition hover:text-gold-soft"
              onClick={() => {
                setActiveGoal("all");
                setActiveDays("all");
              }}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              Wis filters
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {goalFilters.map((goal) => {
            const isActive = activeGoal === goal.value;
            return (
              <button
                aria-pressed={isActive}
                className={`group grid min-h-32 grid-cols-[auto_1fr] gap-4 rounded-md border p-4 text-left transition ${
                  isActive
                    ? "border-gold-soft/80 bg-gold/15 shadow-[0_0_30px_rgba(200,166,75,0.14)]"
                    : "border-white/10 bg-black/35 hover:border-gold/45 hover:bg-gold/5"
                }`}
                key={goal.value}
                onClick={() => setActiveGoal(isActive ? "all" : goal.value)}
                type="button"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-md ${
                    isActive ? "gold-surface text-black" : "bg-white/5 text-gold-soft"
                  }`}
                >
                  <goal.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-base font-black">{goal.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-400">{goal.text}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 border-t border-white/10 pt-6">
          <p className="eyebrow">Stap 2</p>
          <h2 className="mt-2 text-xl font-black">Hoe vaak wil je trainen?</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className={activeDays === "all" ? "btn-gold" : "btn-secondary"}
              onClick={() => setActiveDays("all")}
              type="button"
            >
              Alle dagen
            </button>
            {dayFilters.map((days) => (
              <button
                className={activeDays === days ? "btn-gold" : "btn-secondary"}
                key={days}
                onClick={() => setActiveDays(activeDays === days ? "all" : days)}
                type="button"
              >
                {days} dagen
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Jouw selectie</p>
          <h2 className="mt-2 text-2xl font-black">
            {filtered.length} {filtered.length === 1 ? "schema gevonden" : "schema's gevonden"}
          </h2>
        </div>
        <p className="text-sm text-zinc-400">Direct digitaal beschikbaar na aankoop.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
