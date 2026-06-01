"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  PlayCircle,
  ShoppingBag,
  Utensils,
  Zap,
} from "lucide-react";

const stats = [
  ["20+", "producten"],
  ["2-6", "dagen"],
  ["1500-3500", "kcal"],
];

const routes = [
  {
    icon: Dumbbell,
    href: "/workout-plans",
    label: "Workout Plans",
    text: "Schema's voor kracht, spiermassa en physique.",
  },
  {
    icon: Utensils,
    href: "/nutrition-plans",
    label: "Nutrition Plans",
    text: "Cut, maintain en bulk met heldere calorie-opties.",
  },
  {
    icon: Zap,
    href: "/custom-coaching",
    label: "Custom Coaching",
    text: "Persoonlijke intake voor maatwerk begeleiding.",
  },
];

const tickerItems = [
  "Premium workout plans",
  "Cut, maintain & bulk nutrition",
  "Direct digital downloads",
  "Custom coaching intake",
  "Built for serious gains",
];

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.98)_0%,rgba(13,13,14,0.94)_48%,rgba(0,0,0,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:92px_92px]" />
        <motion.div
          className="absolute left-[18%] top-[18%] h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[16%] top-[28%] h-80 w-80 rounded-full bg-gold-soft/10 blur-3xl"
          animate={{ opacity: [0.16, 0.3, 0.16], scale: [1.08, 0.96, 1.08] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-8 px-6 pb-20 pt-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-gold-soft"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Premium digital fitness
          </motion.div>

          <motion.h1
            className="mt-5 max-w-4xl text-4xl font-black leading-[0.9] tracking-normal text-white min-[390px]:text-5xl sm:text-6xl lg:text-7xl"
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            Train hard. Eat smart. Win trophies.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8"
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            Digitale workout plans, nutrition plans, ebooks en coaching voor sporters die structuur willen zonder ruis.
          </motion.p>

          <motion.div
            className="mt-6 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3"
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map(([value, label]) => (
              <motion.div
                className="rounded-md border border-white/10 bg-white/[0.04] p-3 sm:p-4"
                key={label}
                whileHover={{ y: -3, borderColor: "rgba(239,211,130,0.55)" }}
              >
                <div className="text-xl font-black text-gold-soft sm:text-2xl">{value}</div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-wide text-zinc-500 sm:text-xs">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link className="btn-gold pressable w-full sm:w-auto" href="/workout-plans">
                Shop plans <ShoppingBag className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link className="btn-secondary pressable w-full sm:w-auto" href="/custom-coaching">
                Coaching <PlayCircle className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-5 hidden flex-wrap gap-4 text-sm font-semibold text-zinc-400 sm:flex"
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {["Direct downloadbaar", "Mollie-ready", "Mobiel & desktop"].map((item) => (
              <span className="inline-flex items-center gap-2" key={item}>
                <CheckCircle2 className="h-4 w-4 text-gold-soft" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="premium-card gold-border shine-card p-4 md:p-5"
          initial={{ opacity: 0, x: 34, scale: 0.97, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.18, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
        >
          <div className="rounded-md border border-gold/25 bg-[linear-gradient(145deg,rgba(239,211,130,0.13),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.34)_100%)] p-5">
            <div className="flex items-end justify-between gap-5 border-b border-white/10 pb-5">
              <div>
                <p className="eyebrow">Start hier</p>
                <h2 className="mt-2 text-3xl font-black leading-tight">Kies je route.</h2>
              </div>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-black text-gold-soft">
                Premium
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {routes.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.34 + index * 0.08, duration: 0.45 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    className="pressable group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border border-white/10 bg-black/45 p-4 transition hover:border-gold-soft/70 hover:bg-gold/10"
                    href={item.href}
                  >
                    <span className="gold-surface flex h-11 w-11 items-center justify-center rounded-md text-black">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-base font-black">{item.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-zinc-400">{item.text}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-gold-soft transition group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-gold/25 bg-black/80 py-3 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div
                className="flex items-center gap-4 whitespace-nowrap px-2 text-xs font-black uppercase tracking-[0.22em] text-gold-soft"
                key={`${item}-${index}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-soft shadow-[0_0_16px_rgba(239,211,130,0.85)]" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
