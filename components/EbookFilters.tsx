"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  CalendarDays,
  Dumbbell,
  ListChecks,
  Map,
  Moon,
  RotateCcw,
  Utensils,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { EbookFormat, EbookTopic, Product } from "@/lib/types";

const formatFilters: Array<{
  value: EbookFormat;
  label: string;
  text: string;
  icon: typeof BookOpen;
}> = [
  { value: "Guide", label: "Gidsen", text: "Kort, praktisch en direct toepasbaar.", icon: Map },
  { value: "Ebook", label: "Ebooks", text: "Meer uitleg en achtergrondinformatie.", icon: BookOpen },
  { value: "Checklist", label: "Checklists", text: "Snelle controle zonder lange uitleg.", icon: ListChecks },
  { value: "Planner", label: "Planners", text: "Printbare structuur voor dagelijks gebruik.", icon: CalendarDays },
];

const topicFilters: Array<{
  value: EbookTopic;
  label: string;
  icon: typeof Dumbbell;
}> = [
  { value: "Training", label: "Training", icon: Dumbbell },
  { value: "Nutrition", label: "Voeding", icon: Utensils },
  { value: "Mindset", label: "Mindset", icon: Brain },
  { value: "Recovery", label: "Herstel", icon: Moon },
];

export function EbookFilters({ products }: { products: Product[] }) {
  const [format, setFormat] = useState<EbookFormat | "all">("all");
  const [topic, setTopic] = useState<EbookTopic | "all">("all");

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const formatMatches = format === "all" || product.ebookFormat === format;
        const topicMatches = topic === "all" || product.ebookTopic === topic;
        return formatMatches && topicMatches;
      }),
    [format, products, topic],
  );

  const hasFilters = format !== "all" || topic !== "all";

  return (
    <div>
      <div className="premium-card mb-10 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Kies je formaat</p>
            <h2 className="mt-2 text-2xl font-black">Waar heb je nu iets aan?</h2>
          </div>
          {hasFilters ? (
            <button
              className="inline-flex items-center gap-2 self-start text-sm font-bold text-zinc-400 transition hover:text-gold-soft"
              onClick={() => {
                setFormat("all");
                setTopic("all");
              }}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              Wis filters
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {formatFilters.map((item) => {
            const isActive = format === item.value;
            return (
              <button
                aria-pressed={isActive}
                className={`grid min-h-32 grid-cols-[auto_1fr] gap-4 rounded-md border p-4 text-left transition ${
                  isActive
                    ? "border-gold-soft/80 bg-gold/15 shadow-[0_0_30px_rgba(200,166,75,0.14)]"
                    : "border-white/10 bg-black/35 hover:border-gold/45 hover:bg-gold/5"
                }`}
                key={item.value}
                onClick={() => setFormat(isActive ? "all" : item.value)}
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
                  <span className="block text-base font-black">{item.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-400">{item.text}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 border-t border-white/10 pt-6">
          <p className="eyebrow">Filter op onderwerp</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className={topic === "all" ? "btn-gold" : "btn-secondary"}
              onClick={() => setTopic("all")}
              type="button"
            >
              Alle onderwerpen
            </button>
            {topicFilters.map((item) => (
              <button
                className={topic === item.value ? "btn-gold" : "btn-secondary"}
                key={item.value}
                onClick={() => setTopic(topic === item.value ? "all" : item.value)}
                type="button"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-md border border-gold/25 bg-gold/5 p-4">
          <p className="text-sm leading-6 text-zinc-300">
            Kleine prijs, één duidelijk onderwerp. Combineer meerdere downloads en bouw je eigen kennisbibliotheek vanaf €1.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Microbibliotheek</p>
          <h2 className="mt-2 text-2xl font-black">
            {filtered.length} {filtered.length === 1 ? "download gevonden" : "downloads gevonden"}
          </h2>
        </div>
        <p className="text-sm text-zinc-400">Alle producten kosten maximaal €4.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
