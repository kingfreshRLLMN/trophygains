"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.68)_42%,rgba(0,0,0,0.92)_100%),url('/hero-training.svg')] bg-cover bg-center" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">Premium Digital Fitness</p>
          <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[0.88] tracking-normal text-white md:text-8xl">
            Build your body like a trophy.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
            Trainingsschemas, voedingsplannen, ebooks en coaching voor sporters die luxe design willen combineren met harde, meetbare progressie.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-gold" href="/workout-plans">
              Shop plans <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="btn-secondary" href="/custom-coaching">
              Custom coaching <PlayCircle className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="premium-card gold-border p-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.7 }}
        >
          <div className="aspect-[4/5] rounded-md border border-white/10 bg-[linear-gradient(180deg,rgba(183,154,87,0.22),rgba(255,255,255,0.03)),url('/athlete-card.svg')] bg-cover bg-center" />
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {["Plans", "Macros", "Coaching"].map((item) => (
              <div className="rounded-md border border-white/10 py-3 text-xs font-black uppercase tracking-wide text-zinc-300" key={item}>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
