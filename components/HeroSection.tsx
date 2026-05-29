"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle, ShoppingBag, Star } from "lucide-react";

const stats = [
  ["20+", "digitale producten"],
  ["2-6", "trainingsdagen"],
  ["1500-3500", "kcal opties"],
];

const quickLinks = [
  { href: "/workout-plans", label: "Workout Plans", text: "Kracht, hypertrophy en physique schema's." },
  { href: "/nutrition-plans", label: "Nutrition Plans", text: "Cut, maintain en bulk per caloriebehoefte." },
  { href: "/custom-coaching", label: "Custom Coaching", text: "Persoonlijke intake en begeleiding." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.98)_0%,rgba(18,18,19,0.92)_42%,rgba(0,0,0,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <motion.div
          className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.22, 0.42, 0.22], scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[12%] top-[20%] h-96 w-96 rounded-full bg-gold-soft/10 blur-3xl"
          animate={{ opacity: [0.18, 0.34, 0.18], scale: [1.05, 0.94, 1.05] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09 }}
        >
          <motion.div className="mb-7 flex items-center gap-4" variants={fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                alt="TrophyGains logo"
                className="h-32 w-32 rounded-full border border-gold-soft/80 bg-white object-contain shadow-2xl shadow-gold/20"
                height={160}
                priority
                src="/trophygains-logo-cropped.png"
                width={160}
              />
            </motion.div>
            <div>
              <p className="eyebrow">Trophy Gains</p>
              <p className="mt-2 text-sm font-semibold text-zinc-400">Gains to win trophies</p>
            </div>
          </motion.div>
          <motion.h1
            className="mt-5 max-w-4xl text-6xl font-black leading-[0.88] tracking-normal text-white md:text-8xl"
            variants={fadeUp}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Premium fitness plans voor serieuze gains.
          </motion.h1>
          <motion.p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300" variants={fadeUp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            Koop direct digitale trainingsschema&apos;s, voedingsschema&apos;s en ebooks. Wil je maatwerk? Start dan met custom coaching en krijg een plan dat past bij jouw doel.
          </motion.p>
          <motion.div className="mt-8 grid gap-3 sm:grid-cols-3" variants={fadeUp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            {stats.map(([value, label]) => (
              <motion.div className="rounded-md border border-white/10 bg-white/[0.04] p-4" key={label} whileHover={{ y: -4, borderColor: "rgba(239,211,130,0.55)" }}>
                <div className="text-2xl font-black text-gold-soft">{value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" variants={fadeUp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link className="btn-gold pressable w-full sm:w-auto" href="/workout-plans">
              Shop fitness plans <ShoppingBag className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link className="btn-secondary pressable w-full sm:w-auto" href="/custom-coaching">
              Custom coaching <PlayCircle className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-zinc-400" variants={fadeUp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            {["Direct downloadbaar", "Mollie checkout voorbereid", "Mobiel & desktop"].map((item) => (
              <span className="inline-flex items-center gap-2" key={item}>
                <CheckCircle2 className="h-4 w-4 text-gold-soft" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="premium-card gold-border shine-card p-5 md:p-6"
          initial={{ opacity: 0, x: 38, scale: 0.96, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
        >
          <motion.div
            className="rounded-md border border-gold/30 bg-[linear-gradient(145deg,rgba(239,211,130,0.16),rgba(255,255,255,0.035)_38%,rgba(0,0,0,0.32)_100%)] p-6"
            animate={{ boxShadow: ["0 0 0 rgba(239,211,130,0)", "0 0 45px rgba(239,211,130,0.12)", "0 0 0 rgba(239,211,130,0)"] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="grid gap-6 md:grid-cols-[0.78fr_1fr] md:items-center">
              <motion.div className="gold-surface rounded-md p-4" animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <Image
                  alt="TrophyGains logo"
                  className="aspect-square w-full rounded-full bg-white object-contain"
                  height={360}
                  priority
                  src="/trophygains-logo-cropped.png"
                  width={360}
                />
              </motion.div>
              <div>
                <p className="eyebrow">Premium shop</p>
                <h2 className="mt-2 text-3xl font-black leading-tight">Alles voor je volgende fase.</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Kies een route en start direct met een digitaal plan. Geen onduidelijke pakketten, gewoon helder aanbod.
                </p>
                <div className="mt-5 grid gap-2 text-sm font-semibold text-zinc-300">
                  {["Training", "Voeding", "Ebooks", "Coaching"].map((item) => (
                    <span className="inline-flex items-center gap-2" key={item}>
                      <Star className="h-4 w-4 fill-gold-soft text-gold-soft" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {quickLinks.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.42 + index * 0.08, duration: 0.45 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                  className="pressable group rounded-md border border-white/10 bg-black/45 p-4 transition hover:border-gold-soft/70 hover:bg-gold/10"
                  href={item.href}
                  >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-black">{item.label}</h3>
                    <ArrowRight className="h-4 w-4 text-gold-soft transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
