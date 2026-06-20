"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Flame, Info, RotateCcw, Scale, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type NutritionGoal = "Cut" | "Maintain" | "Bulk";

const goalFilters: Array<{
  value: NutritionGoal;
  label: string;
  range: string;
  text: string;
  icon: typeof Flame;
}> = [
  {
    value: "Cut",
    label: "Vetverlies",
    range: "1500-2500 kcal",
    text: "Een beheerst calorietekort met voldoende eiwitten voor spierbehoud.",
    icon: Flame,
  },
  {
    value: "Maintain",
    label: "Onderhoud",
    range: "1800-3000 kcal",
    text: "Stabiele energie en voeding om gewicht en prestaties te behouden.",
    icon: Scale,
  },
  {
    value: "Bulk",
    label: "Spieropbouw",
    range: "2500-3500 kcal",
    text: "Een gecontroleerd calorieoverschot voor herstel en spiergroei.",
    icon: TrendingUp,
  },
];

export function NutritionFilters({ products }: { products: Product[] }) {
  const [goal, setGoal] = useState<NutritionGoal | "all">("all");
  const [calorie, setCalorie] = useState<number | "all">("all");

  const availableCalories = useMemo(
    () => {
      if (goal === "all") {
        return [];
      }

      return Array.from(
        new Set(
          products
            .filter((product) => product.goal === goal)
            .map((product) => product.calories)
            .filter((value): value is number => typeof value === "number"),
        ),
      ).sort((a, b) => a - b);
    },
    [goal, products],
  );

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const goalMatch = goal === "all" || product.goal === goal;
        const calorieMatch = calorie === "all" || product.calories === calorie;
        return goalMatch && calorieMatch;
      }),
    [calorie, goal, products],
  );

  const hasFilters = goal !== "all" || calorie !== "all";

  return (
    <div>
      <div className="premium-card mb-10 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Stap 1</p>
            <h2 className="mt-2 text-2xl font-black">Wat wil je bereiken?</h2>
          </div>
          {hasFilters ? (
            <button
              className="inline-flex items-center gap-2 self-start text-sm font-bold text-zinc-400 transition hover:text-gold-soft"
              onClick={() => {
                setGoal("all");
                setCalorie("all");
              }}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              Wis filters
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {goalFilters.map((item) => {
            const isActive = goal === item.value;
            return (
              <button
                aria-pressed={isActive}
                className={`grid min-h-40 grid-cols-[auto_1fr] gap-4 rounded-md border p-4 text-left transition ${
                  isActive
                    ? "border-gold-soft/80 bg-gold/15 shadow-[0_0_30px_rgba(200,166,75,0.14)]"
                    : "border-white/10 bg-black/35 hover:border-gold/45 hover:bg-gold/5"
                }`}
                key={item.value}
                onClick={() => {
                  setGoal(isActive ? "all" : item.value);
                  setCalorie("all");
                }}
                type="button"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-md ${
                    isActive ? "gold-surface text-black" : "bg-white/5 text-gold-soft"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-black">{item.label}</span>
                  <span className="mt-1 block text-xs font-black uppercase tracking-wide text-gold-soft">{item.range}</span>
                  <span className="mt-3 block text-sm leading-6 text-zinc-400">{item.text}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 border-t border-white/10 pt-6">
          <p className="eyebrow">Stap 2</p>
          <h2 className="mt-2 text-xl font-black">Kies je dagelijkse calorie-inname</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            De beschikbare opties passen zich aan je gekozen doel aan. Kies een niveau dat aansluit op jouw geschatte
            dagelijkse behoefte.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {goal === "all" ? (
              <button
                className="btn-secondary cursor-not-allowed opacity-60"
                disabled
                type="button"
              >
                Kies eerst je doel
              </button>
            ) : (
              <>
                <button
                  className={calorie === "all" ? "btn-gold" : "btn-secondary"}
                  onClick={() => setCalorie("all")}
                  type="button"
                >
                  Alle passende opties
                </button>
                {availableCalories.map((item) => (
                  <button
                    className={calorie === item ? "btn-gold" : "btn-secondary"}
                    key={item}
                    onClick={() => setCalorie(calorie === item ? "all" : item)}
                    type="button"
                  >
                    {item} kcal
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-md border border-gold/25 bg-gold/5 p-4 md:grid-cols-[auto_1fr_auto] md:items-center">
          <Info className="h-5 w-5 text-gold-soft" />
          <p className="text-sm leading-6 text-zinc-300">
            Je caloriebehoefte verschilt per lengte, gewicht, leeftijd en activiteit. Deze schema&apos;s zijn praktische
            startpunten; persoonlijke begeleiding geeft de nauwkeurigste keuze.
          </p>
          <Link className="text-link whitespace-nowrap" href="/custom-coaching">
            Hulp bij kiezen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Jouw selectie</p>
          <h2 className="mt-2 text-2xl font-black">
            {filtered.length} {filtered.length === 1 ? "schema gevonden" : "schema's gevonden"}
          </h2>
        </div>
        <p className="text-sm text-zinc-400">Inclusief maaltijden, macro&apos;s en wisselopties.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
